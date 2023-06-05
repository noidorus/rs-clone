import { User } from 'firebase/auth';
import React, { useEffect } from 'react';
import { getUserDataHook } from '../../hooks/getLoggedUserData';
import Timeline from '../timeline';

import './index.scss';
import { Recomendation } from './recomendation';
import { fetchPhotos } from '../../redux/slices/mainPageSlice';
import { useAppDispatch } from '../../hooks/redux.hook';

interface MainPageProps {
  user: User;
}

export default function MainPage({ user }: MainPageProps) {
  const userData = getUserDataHook(user.uid);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userData) {
      const usersIds = [...userData.following, userData.userId];
      dispatch(fetchPhotos(usersIds));
    }
  }, [userData]);

  return (
    <div className="dashboard">
      <div className="dashboard__inner">
        <Timeline />
        {userData ? <Recomendation userData={userData} /> : null}
      </div>
    </div>
  );
}
