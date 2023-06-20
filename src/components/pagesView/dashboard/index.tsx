import React, { useEffect } from 'react';
import Timeline from '../../timeline/timeline';

import './index.scss';
import { Recomendations } from './recomendations';
import { fetchPhotos } from '../../../redux/slices/photosSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { IUserProfile } from '../../../types/types';

interface MainPageProps {
  user: IUserProfile;
}

export default function MainPage({ user }: MainPageProps) {
  const { photos } = useAppSelector(({ photos }) => photos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const userIds = [...user.following, user.userId];
    dispatch(fetchPhotos(userIds));
  }, [user.following]);

  return (
    <div className="dashboard">
      <div className="dashboard__inner">
        <Timeline page="main" photos={photos} />
        {user && <Recomendations userData={user} />}
      </div>
    </div>
  );
}
