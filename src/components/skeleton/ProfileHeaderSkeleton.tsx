import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ProfileHeaderSkeleton = () => {
  return (
    <header className="profile__header">
      <Skeleton circle={true} width={150} height={150} />
      <div className="profile__info info">
        <Skeleton height={25} width={100} />
        <Skeleton height={80} style={{ marginTop: '10px' }} />
      </div>
    </header>
  );
};

export { ProfileHeaderSkeleton };
