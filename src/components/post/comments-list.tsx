import React from 'react';

import { IComment, IUserProfile } from '../../types/types';
import CommentItem from './comment-item';

interface CommentsProps {
  comments: IComment[];
}

export default function Comments({ comments }: CommentsProps) {
  const elements = comments.map((value, i) => {
    return <CommentItem key={`p${i}`} commentData={value} />;
  });

  return (
    <div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        {elements}
      </ul>

    </div>
  );
}
