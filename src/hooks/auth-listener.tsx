import { User } from 'firebase/auth';
import React, { useState, useEffect, useContext } from 'react';

import FirebaseContext, {
  FirebaseContextProps,
} from '../context/firebase-context';
import { useAppDispatch } from '../hooks/redux.hook';
import { setUser, fetchUser } from '../redux/slices/authSlice';

const authListener = () => {
  const { auth } = useContext(FirebaseContext) as FirebaseContextProps;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listener = auth.onAuthStateChanged(async (user: User | null) => {
      if (user) {
        dispatch(fetchUser(user.uid));
      } else {
        localStorage.removeItem('auth-user');
        dispatch(setUser(user));
      }
    });

    return () => listener();
  }, [auth]);
};

export default authListener;
