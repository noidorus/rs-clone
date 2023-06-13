import { User } from 'firebase/auth';
import React, { useState, useEffect, useContext } from 'react';

import FirebaseContext, {
  FirebaseContextProps,
} from '../context/firebase-context';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { setUser } from '../redux/slices/auth';

const authListener = () => {
  const { auth } = useContext(FirebaseContext) as FirebaseContextProps;
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    const listener = auth.onAuthStateChanged(async (user: User | null) => {
      if (user) {
        localStorage.setItem('auth-user', JSON.stringify(user.uid));
        dispatch(setUser(user.uid));
      } else {
        localStorage.removeItem('auth-user');
        dispatch(setUser(user));
      }
    });

    return () => listener();
  }, [auth]);

  return { userId };
};

export default authListener;
