import { FirebaseApp } from '@firebase/app-types';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setUserData, doesUsernameExist, getError } from '../services/firebase';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { MyError } from '../types/types';
import './sign-up.scss';

export default function SignUp() {
  const navigate = useNavigate();
  const firebase = useContext(FirebaseContext)?.firebase as FirebaseApp;

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        const auth = getAuth(firebase);
        const createUserResult = await createUserWithEmailAndPassword(
          auth,
          emailAddress,
          password
        );

        updateProfile(createUserResult.user, {
          displayName: username,
        });

        const newUser = {
          userId: createUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLocaleLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        };

        setUserData(newUser);

        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        const err = error as MyError;
        const message = getError(err);

        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(message);
      }
    } else {
      setError('That username is already taken, please try another!');
    }
  };

  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, []);

  return (
    <main className="signup-page">
      <div className="signup-page__inner">
        <header className="signup-page__header signup-header">
          <h1 className="signup-header__title visually-hidden">Instagram</h1>
          <img className='signup-header__logo' src="./images/logo.png" alt="Instagram logo" width="175" height="51" />
          <h2 className='signup-header__text'>Sign up to see photos and videos from your friends.</h2>
        </header>

        {error && <p>{error}</p>}

        <form className='signup-page__form signup-form' onSubmit={handleSignUp} method="POST">
          <input
            className='signup-form__field field'
            type="text"
            aria-label="Enter your username"
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
          <input
            className='signup-form__field field'
            type="text"
            aria-label="Enter your full name"
            placeholder="Full Name"
            onChange={({ target }) => setFullName(target.value)}
            value={fullName}
          />
          <input
            className='signup-form__field field'
            type="text"
            aria-label="Enter your email address"
            placeholder="Email address"
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
          />
          <input
            className='signup-form__field field'
            type="password"
            aria-label="Enter your password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <p className='signup-form__text'>By signing up, you agree to our Terms.</p>
          <button className='signup-form__action button button--primary' disabled={isInvalid} type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div className='signup-page__login'>
        <p>
          Have an account?{` `}
          <Link className='signup-page__link' to={ROUTES.LOGIN}>Log In</Link>
        </p>
      </div>
      <footer className="signup-page__footer">© 2023 Instagram from RSSchool</footer>
    </main>
  );
}
