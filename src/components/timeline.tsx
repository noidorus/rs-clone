import React, { useState, useEffect } from 'react';
import Post from './post/post';

import { IPhotoDoc, IUserProfile } from '../types/types';

import './timeline.scss';

interface TimeLineProps {
  photosData: IPhotoDoc[];
  user?: IUserProfile;
}

export default function Timeline({ photosData }: TimeLineProps) {
  const elements = photosData.map((photo, index) => {
    return <Post key={index} photo={photo} />;
  });

  return (
    <div className='post-list'>
      <header className='post-list__header'>
        <h3 className='post-list__title'>Posts</h3>
      </header>
      <ul className='post-list__inner'>
        {elements}
      </ul>
    </div>
  );
}
