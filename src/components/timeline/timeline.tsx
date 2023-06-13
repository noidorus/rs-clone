import React, { useState, useEffect, useContext } from 'react';
import Post from '../post/post';

import './timeline.scss';
import { TimeLineProps } from './types';

export default function Timeline({ photos, title }: TimeLineProps) {
  useEffect(() => {}, []);

  const elements = photos.map((photo, index) => {
    return <Post key={index} photo={photo} />;
  });

  return (
    <div className="post-list">
      {title && <h3 className="post-list__title">{title}</h3>}

      <ul className="post-list__inner">{elements}</ul>
    </div>
  );
}
