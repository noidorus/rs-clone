import React, { createRef, useState, FormEvent } from 'react';

import { useAppSelector } from '../../hooks/redux.hook';
import { usePost } from '../providers/PostProvider';

import './comment-form.scss';

export default function CommentForm() {
  const { setNewComment } = usePost();
  const commentRef = createRef<HTMLInputElement>();

  const submitComment = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (commentRef.current) {
      const comment = commentRef.current.value.trim();
      setNewComment(comment);
      commentRef.current.value = '';
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
  };

  return (
    <form className="comment-form" onSubmit={submitComment}>
      <input
        className="comment-form__field field field--transparent"
        type="text"
        placeholder="Add a comment..."
        ref={commentRef}
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
