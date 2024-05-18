import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { firebase } from '../firebase/firebase'; // Import Firebase module

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleRegisterWithEmailAndPassword = async () => {
    try {
      // Register user with email and password
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      // Update user display name
      await userCredential.user?.updateProfile({
        displayName: `${firstName} ${lastName}`
      });
      // Navigate to success page or home page
      navigate('/');
      setIsLoggedIn(true)
    } catch (error:any) {
      // Handle registration error
      console.error('Registration error:', error.message);
    }
  };

  const handleRegisterWithGoogle = async () => {
    try {
      // Sign in with Google provider
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      // Navigate to success page or home page
      navigate('/');
      setIsLoggedIn(true)
    } catch (error:any) {
      // Handle registration error
      console.error('Google authentication error:', error.message);
    }
  };

  return (
    <div className='register-div'>
      <h3>Регистрация</h3>
      <span className='register-div__closeButton' onClick={() => navigate("/")}>X</span>
      <form className='register-div__form' onSubmit={handleRegisterWithEmailAndPassword}>
        <div className="register-div__form__inputs">
          <label>
            <input className='register-div__form__inp' type="text" placeholder='Имя' value={firstName} onChange={e => setFirstName(e.target.value)} required />
          </label>
          <label>
            <input className='register-div__form__inp' type="text" placeholder='Фамилия' value={lastName} onChange={e => setLastName(e.target.value)} required />
          </label>
          <label>
            <input className='register-div__form__inp' type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            <input className='register-div__form__inp' type="password" placeholder='Пароль' value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
        </div>
        <button className='register-div__form__submitButton' type='submit'>Регистрация с Email</button>
      </form>
      <div className='register-div__or'>или</div>
      <button className='register-div__form__googleButton' onClick={handleRegisterWithGoogle}>Регистрация с Google</button>
    </div>
  );
};

export default Register;



