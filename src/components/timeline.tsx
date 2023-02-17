import React, { useState, useEffect } from 'react';
import Post from './post/post';

import { IPhotoDoc, IUserProfile } from '../types/types';

interface TimeLineProps {
  photosData: IPhotoDoc[];
  user?: IUserProfile;
}

export default function Timeline({ photosData }: TimeLineProps) {
  const elements = photosData.map((photo, index) => {
    return <Post key={index} photo={photo} />;
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
