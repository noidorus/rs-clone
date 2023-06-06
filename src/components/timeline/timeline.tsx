import React, { useState, useEffect, useContext } from 'react';
import Post from '../post/post';

import './timeline.scss';
import { TimeLineProps } from './types';

export default function Timeline({ photos }: TimeLineProps) {
  const elements = photos.map((photo, index) => {
    return <Post key={index} photo={photo} />;
  });

  return (
    <div className="post-list">
      {/* <header className="post-list__header">
        <h3 className="post-list__title">Posts</h3>
      </header> */}
      <ul className="post-list__inner">{elements}</ul>
    </div>
  );
}
