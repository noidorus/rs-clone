import { FirebaseApp } from '@firebase/app-types';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebaseContext';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const navigate = useNavigate();
  const firebase = useContext(FirebaseContext)?.firebase as FirebaseApp;

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const auth = getAuth(firebase);

      await signInWithEmailAndPassword(auth, emailAddress, password);
      navigate(ROUTES.DASHBOARD);
    } catch {
      setEmailAddress('');
      setPassword('');
      setError('Invalid email address or password!');
    }
  };

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  return (
    <div>
      <img src="./images/iphone.jpg" alt="Iphone with Instagram" width="380" />
      <div>
        <h1>
          <img src="./images/logo.png" alt="Instagram logo" />
        </h1>

        {error && <p>{error}</p>}

        <form onSubmit={handleLogin} method="POST">
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
            Log In
          </button>
        </form>
      </div>
      <div>
        <p>
          Don't have an account?{` `}
          <Link to="/sign-up">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
