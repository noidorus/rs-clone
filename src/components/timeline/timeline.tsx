import React from 'react';
import { CardPreview, CardSmall } from '../card';
import { CommentsProvider } from '../providers/CommentsProvider';

import { TimeLineProps } from './types';
import './timeline.scss';

export default function Timeline({ photos, title, page }: TimeLineProps) {
  const elements = photos.map((photo, index) => {
    let content: JSX.Element;
    if (page === 'profile') {
      content = <CardPreview photo={photo} />;
    } else {
      content = <CardSmall photo={photo} />;
    }

    return <CommentsProvider key={index}>{content}</CommentsProvider>;
  });

  return (
    <div className="post-list">
      {title && <h3 className="post-list__title">{title}</h3>}

      <ul className="post-list__inner">{elements}</ul>
    </div>
  );
}
