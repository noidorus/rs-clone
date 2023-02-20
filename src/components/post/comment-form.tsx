import { User } from 'firebase/auth';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import UserContext from '../../context/user-context';
import { IComment } from '../../types/types';
import { updateComments } from '../../firebase/services';
import CommentsContext from '../../context/comments-context';

interface CommentsProps {
  // comments: IComment[];
  docId: string;
  // setCommentsArr: Dispatch<SetStateAction<IComment[]>>
}

export default function CommentForm({ docId }: CommentsProps) {
  const loggedUser = useContext(UserContext).user as User;
  const {commentsArr, setCommentsArr} = useContext(CommentsContext)


  const [newComment, setNewComment] = useState('');

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
      // console.log(comments)
    }

    setNewComment('');
  };

  return (
    <form onSubmit={submitComment}>
      <input
        type="text"
        placeholder="Add a comment"
        onChange={({ target }) => setNewComment(target.value)}
        value={newComment}
      />
      <button type="submit">Post</button>
    </form>
  );
}
