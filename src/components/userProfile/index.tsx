import React, { useEffect, useState, useContext } from 'react';
import UserHeader from './user-header';
import Timeline from '../timeline/timeline';
import { IUserProfile } from '../../types/types';

import './index.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { fetchProfilePhotos } from '../../redux/slices/profileSlice';

interface UserPageProps {
  user: IUserProfile;
}

export default function UserProfile({ user }: UserPageProps) {
  const { photos, photosLoadingStatus } = useAppSelector(
    ({ profile }) => profile
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfilePhotos(user.userId));
  }, [user]);

  return (
    <div className="profile">
      <UserHeader user={user} />

      <Timeline photos={photos} />
    </div>
  );
}
