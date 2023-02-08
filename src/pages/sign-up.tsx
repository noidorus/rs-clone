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
    <div>
      <img src="./images/iphone.jpg" alt="Iphone with Instagram" width="380" />
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
          <Link to={ROUTES.LOGIN}>Log In</Link>
        </p>
      </div>
    </div>
  );
}
