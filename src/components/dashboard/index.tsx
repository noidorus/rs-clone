import React, { useEffect } from 'react';
import Timeline from '../timeline/timeline';

import './index.scss';
import { Recomendation } from './recomendation';
import { fetchPhotos } from '../../redux/slices/mainPageSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { IUserProfile } from '../../types/types';

interface MainPageProps {
  user: IUserProfile;
}

export default function MainPage({ user }: MainPageProps) {
  const { photos, photosLoadingStatus } = useAppSelector(
    ({ photos }) => photos
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const usersIds = [...user.following, user.userId];
    dispatch(fetchPhotos(usersIds));
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__inner">
        <Timeline photos={photos} />
        {user && <Recomendation userData={user} />}
      </div>
    </div>
  );
}
