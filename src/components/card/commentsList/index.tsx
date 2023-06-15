import React from 'react';

import { IComment } from '../../../types/types';
import CommentItem from './Comment';

import './styles.scss';

interface CommentsProps {
  comments: IComment[];
  photoDocId: string;
  photoUserId: string;
}

export default function Comments({
  comments,
  photoDocId,
  photoUserId,
}: CommentsProps) {
  const elements = comments.map((value, i) => {
    return (
      <CommentItem
        key={`c${i}`}
        commentData={value}
        photoDocId={photoDocId}
        photoUserId={photoUserId}
      />
    );
  });

  return <ul className="comments-list">{elements}</ul>;
}
