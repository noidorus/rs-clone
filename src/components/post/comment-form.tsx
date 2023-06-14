import React, { createRef, useState, FormEvent } from 'react';

import { useAppSelector } from '../../hooks/redux.hook';
import { usePost } from '../providers/PostProvider';

import './comment-form.scss';

interface CommentsProps {
  docId: string;
}

export default function CommentForm({ docId }: CommentsProps) {
  const { setNewComment } = usePost();
  const commentRef = createRef<HTMLInputElement>();
  const { loggedUser } = useAppSelector(({ userInfo }) => userInfo);

  const submitComment = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const comment = commentRef.current?.value.trim();

    if (loggedUser && comment) {
    }

    // if (loggedUser &&) {
    //   const commentData = {
    //     comment: newComment,
    //     date: Date.now(),
    //     userId: loggedUser.userId,
    //   };

    //   if (newComment.length > 0) {
    //     const newCommentsArr = await updateComments(commentData, docId);
    //     setCommentsArr(newCommentsArr);
    //   }

    //   setNewComment('');
    // }

    if (commentRef.current) {
      commentRef.current.value = '';
    }
  };

  return (
    <form className="comment-form" onSubmit={submitComment}>
      <input
        className="comment-form__field field field--transparent"
        type="text"
        placeholder="Add a comment..."
        ref={commentRef}
        // onChange={({ target }) => setNewComment(target.value)}
        defaultValue={commentRef.current?.value}
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
