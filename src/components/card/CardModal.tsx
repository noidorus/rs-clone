import React, { useState } from 'react';
import CommentForm from '../post/comment-form';
import Comments from '../post/comments-list';
import Like from './like/like';
import PostHeader from './postHeader/post-header';
import { CardModalProps } from './props';
import { PrettyDate } from './date/Date';
import PacmanSpinner from '../spinner/spinner';
import { selectLoading } from '../../hooks/redux.hook';
import { usePost } from '../providers/PostProvider';

const CardModal = ({ photo, user }: CardModalProps) => {
  const { likes, imageSrc, caption, docId, dateCreated, userId } = photo;
  const { comments } = usePost();

  const loading = selectLoading();

  return (
    <div className="post--modal">
      <img className="post__image" src={imageSrc} />

      <div className="modal-post__right">
        <PostHeader photoData={photo} user={user} />

        <div className="comments">
          <p className="comments__desc">{caption}</p>

          <Comments
            comments={comments}
            photoDocId={docId}
            photoUserId={userId}
          />
        </div>

        <div className="post__date-like">
          <Like likes={likes} docId={docId} />
          <PrettyDate date={dateCreated} />
        </div>

        <CommentForm />
      </div>

      <PacmanSpinner loading={loading} />
    </div>
  );
};

export { CardModal };
