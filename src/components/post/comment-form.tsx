import React, { useContext, useState } from 'react';

import { updateComments } from '../../firebase/services';
import CommentsContext from '../../context/comments-context';
import { useAppSelector } from '../../hooks/redux.hook';

import './comment-form.scss';

interface CommentsProps {
  docId: string;
}

export default function CommentForm({ docId }: CommentsProps) {
  const { setCommentsArr } = useContext(CommentsContext);
  const [newComment, setNewComment] = useState('');
  const loggedUser = useAppSelector(({ auth }) => auth.loggedUser);

  const submitComment = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (loggedUser) {
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
    }
  };

  return (
    <form className="comment-form" onSubmit={submitComment}>
      <input
        className="comment-form__field field field--transparent"
        type="text"
        placeholder="Add a comment..."
        onChange={({ target }) => setNewComment(target.value)}
        value={newComment}
      />
      <button
        className="comment-form__action button button--transparent"
        type="submit"
      >
        Post
      </button>
    </form>
  );
}
