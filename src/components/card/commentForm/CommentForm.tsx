import React, { createRef, FormEvent } from 'react';

import { usePost } from '../../providers/PostProvider';

import './styles.scss';

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
