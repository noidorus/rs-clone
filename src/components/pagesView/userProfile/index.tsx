import React, { useEffect } from 'react';
import UserHeader from './user-header';
import Timeline from '../../timeline/timeline';

import './index.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { fetchProfilePhotos } from '../../../redux/slices/profileSlice';
import PacmanSpinner from '../../spinner/spinner';

export default function UserProfile() {
  const { photos, user } = useAppSelector(({ profile }) => profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchProfilePhotos(user.userId));
    }
  }, [user]);

  if (!user) {
    return <PacmanSpinner loading={true} />;
  }

  return (
    <div className="profile">
      <UserHeader user={user} />
      <Timeline page="profile" photos={photos} />
    </div>
  );
}
