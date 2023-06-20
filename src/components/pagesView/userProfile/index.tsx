import React, { useEffect } from 'react';
import UserHeader from './UserHeader';
import Timeline from '../../timeline/timeline';

import './styles.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { fetchProfilePhotos } from '../../../redux/slices/photosSlice';
import PacmanSpinner from '../../spinner/spinner';

const UserProfile = () => {
  const { userProfile } = useAppSelector(({ userCenter }) => userCenter);
  const { profilePhotos } = useAppSelector(({ photos }) => photos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userProfile) {
      dispatch(fetchProfilePhotos([userProfile.userId]));
    }
  }, [userProfile?.userId]);

  if (!userProfile) {
    return <PacmanSpinner loading={true} />;
  }

  return (
    <div className="profile">
      <UserHeader user={userProfile} />
      <Timeline page="profile" photos={profilePhotos} />
    </div>
  );
};

export default UserProfile;
