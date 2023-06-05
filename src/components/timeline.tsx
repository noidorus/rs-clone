import React, { useState, useEffect, useContext } from 'react';
import Post from './post/post';

import './timeline.scss';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/setupStore';

export default function Timeline() {
  const { photos, photosLoadingStatus } = useSelector(
    (state: RootState) => state.dashboard
  );

  const elements = photos.map((photo, index) => {
    return <Post key={index} photo={photo} />;
  });

  return (
    <div className="post-list">
      <header className="post-list__header">
        <h3 className="post-list__title">Posts</h3>
      </header>
      <ul className="post-list__inner">{elements}</ul>
    </div>
  );
}
