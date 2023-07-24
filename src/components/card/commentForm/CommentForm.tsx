import React, { createRef, FormEvent } from 'react';
import { RingLoader } from 'react-spinners';

import { usePost } from '../../providers/PostProvider';
import { RingSpinner } from '../../spinner/spinner';

import './styles.scss';

export default function CommentForm() {
  const { setNewComment, loading } = usePost();
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

      {loading ? (
        <RingLoader color="blue" size={30} />
      ) : (
        // <RingSpinner loading={true} size={30} />
        <button
          className="comment-form__action button button--transparent"
          type="submit"
        >
          Post
        </button>
      )}
    </form>
  );
}
