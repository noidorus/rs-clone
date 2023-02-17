import React from 'react';
import Post from '../post/post';

import { IPhotoDoc, IUserProfile } from '../../types/types';

interface TimeLineProps {
  photosData: IPhotoDoc[];
  user: IUserProfile;
}

export default function Timeline({ photosData, user }: TimeLineProps) {
  const elements = photosData.map((photo, index) => {
    return <Post key={index} photo={photo} user={user} />;
  });

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
      }}
    >
      {elements}
    </div>
  );
}
