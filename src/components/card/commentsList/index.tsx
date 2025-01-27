import React from 'react';

import { IComment } from '../../../types/types';
import CommentItem from './Comment';

import './styles.scss';

interface CommentsProps {
  comments: IComment[];
  photoUserId: string;
}

export default function Comments({ comments, photoUserId }: CommentsProps) {
  const elements = comments.map((value, i) => {
    return (
      <CommentItem
        key={`c${i}`}
        commentData={value}
        photoUserId={photoUserId}
      />
    );
  });

  return <ul className="comments-list">{elements}</ul>;
}
