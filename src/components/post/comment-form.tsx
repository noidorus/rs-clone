import { User } from 'firebase/auth';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import UserContext from '../../context/user-context';
import { IComment } from '../../types/types';
import { updateComments } from '../../firebase/services';
import CommentsContext from '../../context/comments-context';

interface CommentsProps {
  docId: string;
}

export default function CommentForm({ docId }: CommentsProps) {
  const loggedUser = useContext(UserContext).user as User;
  const { setCommentsArr } = useContext(CommentsContext);

  const [newComment, setNewComment] = useState('');

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    const commentData = {
      comment: newComment,
      date: Date.now(),
      userId: loggedUser.uid,
    };

    if (newComment.length > 0) {
      const newCommentsArr = await updateComments(commentData, docId);
      setCommentsArr(newCommentsArr);
    }

    setNewComment('');
  };

  return (
    <form onSubmit={submitComment}>
      <input
        className='field'
        type="text"
        placeholder="Add a comment"
        onChange={({ target }) => setNewComment(target.value)}
        value={newComment}
      />
      <button className='button' type="submit">Post</button>
    </form>
  );
}
