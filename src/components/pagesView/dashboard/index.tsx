import React, { useEffect } from 'react';
import Timeline from '../../timeline/timeline';

import { Recomendations } from './recomendations';
import { fetchPhotos, Status } from '../../../redux/slices/photosSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { IUserProfile } from '../../../types/types';
import { SkeletonPostSmall } from '../../skeleton/PostSkeleton';

import './index.scss';

interface MainPageProps {
  user: IUserProfile;
}

export default function MainPage({ user }: MainPageProps) {
  const { photos, photosLoadingStatus } = useAppSelector(
    ({ photos }) => photos
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const userIds = [...user.following, user.userId];

    dispatch(fetchPhotos(userIds));
  }, [user.following]);

  const props = {
    page: 'main' as 'main',
    photos: photos,
    zeroLengthMessage: 'Subscribe or upload your first photo!',
  };

  const content = photosLoadingStatus == Status.IDLE && <Timeline {...props} />;
  const loading = photosLoadingStatus == Status.LOADING && (
    <SkeletonPostSmall />
  );

  return (
    <div className="dashboard">
      <div className="dashboard__inner">
        {content}
        {loading}
        {user && <Recomendations userData={user} />}
      </div>
    </div>
  );
}
