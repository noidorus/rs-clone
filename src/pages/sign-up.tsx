import { FirebaseApp } from '@firebase/app-types';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function SignUp() {
  const navigate = useNavigate();
  const firebase = useContext(FirebaseContext)?.firebase as FirebaseApp;

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
    } catch {}
  };

  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, []);

  return (
    <div>
      <img src="./images/iphone.jpg" alt="Iphone with Instagram" />
      <div>
        <h1>
          <img src="./images/logo.png" alt="Instagram logo" />
        </h1>

        {error && <p>{error}</p>}

        <form onSubmit={handleSignUp} method="POST">
          <input
            type="text"
            aria-label="Enter your username"
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
          <input
            type="text"
            aria-label="Enter your full name"
            placeholder="Full Name"
            onChange={({ target }) => setFullName(target.value)}
            value={fullName}
          />
          <input
            type="text"
            aria-label="Enter your email address"
            placeholder="Email address"
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
          />
          <input
            type="password"
            aria-label="Enter your password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div>
        <p>
          Have an account?{` `}
          <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}
