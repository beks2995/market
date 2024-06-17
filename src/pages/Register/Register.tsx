import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { firebase } from '../../firebase/firebase'; // Import Firebase module
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const db = getFirestore(); // Initialize Firestore

  const handleRegisterWithEmailAndPassword = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    try {
      // Register user with email and password
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      // Update user display name
      await userCredential.user?.updateProfile({
        displayName: `${firstName} ${lastName}`
      });
      // Add user to Firestore users collection
      await setDoc(doc(db, 'users', userCredential.user?.uid ?? ''), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        cart: [],
        likes: []
      });
      // Navigate to success page or home page
      navigate('/');
      setIsLoggedIn(true);
    } catch (error: any) {
      // Handle registration error
      console.error('Registration error:', error.message);
    }
  };

  const handleRegisterWithGoogle = async () => {
    try {
      // Sign in with Google provider
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      const user = userCredential.user;
      if (user) {
        // Check if user already exists in Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
          // Add user to Firestore users collection if not exists
          await setDoc(doc(db, 'users', user.uid), {
            firstName: user.displayName?.split(' ')[0] || '',
            lastName: user.displayName?.split(' ')[1] || '',
            email: user.email,
            cart: [],
            likes: []
          });
        }
      }
      // Navigate to success page or home page
      navigate('/');
      setIsLoggedIn(true);
    } catch (error: any) {
      // Handle registration error
      console.error('Google authentication error:', error.message);
    }
  };

  return (
    <div className='register_div'>
      <h3>Регистрация</h3>
      <span className='register_div__closeButton' onClick={() => navigate("/")}>X</span>
      <form className='register_div__form' onSubmit={handleRegisterWithEmailAndPassword}>
        <div className="register_div__form__inputs">
          <label>
            <input className='register_div__form__inp' type="text" placeholder='Имя' value={firstName} onChange={e => setFirstName(e.target.value)} required />
          </label>
          <label>
            <input className='register_div__form__inp' type="text" placeholder='Фамилия' value={lastName} onChange={e => setLastName(e.target.value)} required />
          </label>
          <label>
            <input className='register_div__form__inp' type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            <input className='register_div__form__inp' type="password" placeholder='Пароль' value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
        </div>
        <button className='register_div__form__submitButton' type='submit'>Регистрация с Email</button>
      </form>
      <div className='register_div__or'>или</div>
      <button className='register_div__form__googleButton' onClick={handleRegisterWithGoogle}>Регистрация с Google</button>
    </div>
  );
};

export default Register;
