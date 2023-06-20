import { User } from 'firebase/auth';
import React, { useEffect, useContext } from 'react';

import FirebaseContext, {
  FirebaseContextProps,
} from '../context/firebase-context';
import { useAppDispatch } from '../hooks/redux.hook';
import { fetchUserByUserId, signOut } from '../redux/slices/userCenter';

const authListener = () => {
  const { auth } = useContext(FirebaseContext) as FirebaseContextProps;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const listener = auth.onAuthStateChanged(async (user: User | null) => {
      if (user) {
        dispatch(fetchUserByUserId(user.uid));
      } else {
        localStorage.removeItem('auth-user');
        dispatch(signOut());
      }
    });

    return () => listener();
  }, [auth]);
};

export default authListener;
