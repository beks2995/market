import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { firebase } from '../firebase/firebase'; // Import Firebase module

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginWithEmailAndPassword = async () => {
    try {
      // Sign in with email and password
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // Navigate to success page or home page
      navigate('/');
    } catch (error:any) {
      // Handle login error
      console.error('Login error:', error.message);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      // Sign in with Google provider
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      // Navigate to success page or home page
      navigate('/');
    } catch (error:any) {
      // Handle login error
      console.error('Google authentication error:', error.message);
    }
  };

 

  return (
    <div className='login-div'>
      <h3>Вход</h3>
      <span className='login-div__closeButton' onClick={() => navigate("/")}>X</span>
      <form className='login-div__form' onSubmit={handleLoginWithEmailAndPassword}>
        <div className="login-div__form__inputs">
          <label>
            <input className='login-div__form__inp' type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            <input className='login-div__form__inp' type="password" placeholder='Пароль' value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
        </div>
        <button className='login-div__form__submitButton' type='submit'>Вход с Email</button>
      </form>
      <div className='login-div__or'>или</div>
      <button className='login-div__form__googleButton' onClick={handleLoginWithGoogle}>Вход с Google</button>
      <div className='login-div__signOutButton'>
      </div>
    </div>
  );
};

export default Login;
