import { User } from 'firebase/auth';
import React, { useContext, useState } from 'react';

import UserContext from '../../context/user-context';

import { IComment, IUserProfile } from '../../types/types';
import { updateComments } from '../../firebase/services';
import CommentItem from './comment-item';

interface CommentsProps {
  comments: IComment[];
  docId: string;
}

export default function Comments({ comments, docId }: CommentsProps) {
  const loggedUser = useContext(UserContext).user as User;
  const [newComment, setNewComment] = useState('');
  const [commentsArr, setCommentsArr] = useState(comments);

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    const commentData = {
      comment: newComment,
      date: Date.now(),
      userId: loggedUser.uid,
    };

    if (newComment.length > 0) {
      updateComments(commentData, docId).catch((e) => console.log(e));
      setCommentsArr([...commentsArr, commentData]);
    }

    setNewComment('');
  };

  const elements = commentsArr.map((value, i) => {
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

      <form onSubmit={submitComment}>
        <input
          type="text"
          placeholder="Add a comment"
          onChange={({ target }) => setNewComment(target.value)}
          value={newComment}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
