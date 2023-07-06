import React, { useEffect } from 'react';
import UserHeader from './UserHeader';
import Timeline from '../../timeline/timeline';

import './styles.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { fetchProfilePhotos, Status } from '../../../redux/slices/photosSlice';
import { SkeletonPostPreview } from '../../skeleton/PostSkeleton';
import { ProfileHeaderSkeleton } from '../../skeleton/ProfileHeaderSkeleton';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

const UserProfile = () => {
  const { userProfile, loading } = useAppSelector(
    ({ userCenter }) => userCenter
  );
  const { profilePhotos, photosLoadingStatus } = useAppSelector(
    ({ photos }) => photos
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userProfile) {
      dispatch(fetchProfilePhotos([userProfile.userId]));
    }
  }, [userProfile?.userId]);

  const props = {
    page: 'profile' as 'profile',
    photos: profilePhotos,
    zeroLengthMessage: 'This user has not uploaded any photos yet!',
  };

  if (userProfile === undefined) {
    return (
      <div className="profile not-found">
        <h3>Sorry, this page isn't available.</h3>
        <p>
          The link you followed may be broken, or the page may have been
          removed. <Link to={ROUTES.DASHBOARD}>Go back to Fakestagram.</Link>
        </p>
      </div>
    );
  }

  const profileLoding = loading && <ProfileHeaderSkeleton />;
  const profileHeader = userProfile && !loading && (
    <UserHeader user={userProfile} />
  );

  const photos = photosLoadingStatus == Status.IDLE && userProfile && (
    <Timeline {...props} />
  );
  const photosLoading = (photosLoadingStatus == Status.LOADING ||
    !userProfile) && <SkeletonPostPreview />;

  return (
    <div className="profile">
      {profileLoding}
      {profileHeader}
      {photos}
      {photosLoading}
    </div>
  );
};

export default UserProfile;
