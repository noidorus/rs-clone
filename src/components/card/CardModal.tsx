import React from 'react';
import CommentForm from '../post/comment-form';
import Comments from '../post/comments-list';
import Like from './like/like';
import PostHeader from './postHeader/post-header';
import { CardModalProps } from './props';
import { PrettyDate } from './date/Date';

const CardModal = ({ photo, user, comments }: CardModalProps) => {
  const { likes, imageSrc, caption, docId, dateCreated, userId } = photo;

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
        {/* <footer className="comments__footer"> */}
        <div className="post__date-like">
          <Like likes={likes} docId={docId} />
          <PrettyDate date={dateCreated} />
        </div>

        <CommentForm docId={docId} />
        {/* </footer> */}
      </div>
    </div>
  );
};

export { CardModal };
