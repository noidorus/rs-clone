import React, { useEffect, useState, useContext } from 'react';
import UserHeader from './user-header';
import Timeline from '../timeline/timeline';
import { IUserProfile } from '../../types/types';

import './index.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { fetchProfilePhotos } from '../../redux/slices/mainPageSlice';

interface UserPageProps {
  user: IUserProfile;
}

export default function UserProfile({ user }: UserPageProps) {
  const { profilePhotos } = useAppSelector(({ photos }) => photos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfilePhotos([user.userId]));
  }, [user]);

  return (
    <div className="profile">
      <UserHeader user={user} />

      <Timeline photos={profilePhotos} />
    </div>
  );
}
