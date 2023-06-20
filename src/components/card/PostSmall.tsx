import React from 'react';

import { getUserDataHook } from '../../hooks/getLoggedUserData';
import CommentForm from './commentForm/CommentForm';
import Comments from './commentsList';
import Like from './like/like';
import PostHeader from './postHeader/post-header';
import { usePost } from '../providers/PostProvider';
import { CardProps } from './props';
import { PrettyDate } from './date/Date';
import { PostModal } from './PostModal';
import PacmanSpinner from '../spinner/spinner';

const PostSmall = ({ photo }: CardProps) => {
  const { dateCreated, userId } = photo;
  const user = getUserDataHook(userId);
  const { comments, loading, setModal } = usePost();

  const handleOpenModal = () => {
    user && setModal(<PostModal photo={photo} user={user} />);
  };

  return (
    <>
      <div className="post-list__item post post--dashboard">
        {user && <PostHeader photoData={photo} user={user} />}

        <div className="post__inner">
          <img
            className="post__image"
            src={photo.imageSrc}
            width="468"
            height="584"
            onClick={handleOpenModal}
          />

          <div className="post__date-like">
            <Like />
            <PrettyDate date={dateCreated} />
          </div>

          <p className="post__desc">{photo.caption}</p>

          <Comments comments={comments} photoUserId={userId} />

          {comments.length > 2 && (
            <a className="post__more" onClick={handleOpenModal}>
              Show more comments...
            </a>
          )}

          <CommentForm />
        </div>

        <PacmanSpinner loading={loading} />
      </div>
    </>
  );
};

export { PostSmall };
