import React from 'react';
import { PostPreview, PostSmall } from '../card';
import { PostProvider } from '../providers/PostProvider';

import { TimeLineProps } from './types';
import './timeline.scss';

export default function Timeline({
  photos,
  page,
  zeroLengthMessage,
}: TimeLineProps) {
  const elements = photos.map((photo, index) => {
    let content: JSX.Element;
    if (page === 'profile') {
      content = <PostPreview photo={photo} />;
    } else {
      content = <PostSmall photo={photo} />;
    }

    return <PostProvider key={index}>{content}</PostProvider>;
  });

  if (!photos.length) {
    return <div className="photos__empty">{zeroLengthMessage}</div>;
  }

  return (
    <div className="post-list">
      <ul className="post-list__inner">{elements}</ul>
    </div>
  );
}
