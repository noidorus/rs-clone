import React from 'react';
import { getUserDataHook } from '../../hooks/getLoggedUserData';
import CommentForm from '../post/comment-form';
import Comments from '../post/comments-list';
import Like from './like/like';
import PostHeader from './postHeader/post-header';
import { useComments } from '../providers/CommentsProvider';
import { useModal } from '../providers/ModalProvider';
import { CardProps } from './props';
import { PrettyDate } from './date/Date';
import { CardModal } from './CardModal';

const CardSmall = ({ photo }: CardProps) => {
  const { likes, docId, dateCreated, userId } = photo;
  const user = getUserDataHook(userId);
  const { comments } = useComments();
  const { setModal } = useModal();

  const handleOpenModal = () => {
    user &&
      setModal(<CardModal photo={photo} user={user} comments={comments} />);
  };

  return (
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
          <Like likes={likes} docId={docId} />
          <PrettyDate date={dateCreated} />
        </div>

        <p className="post__desc">{photo.caption}</p>

        <Comments comments={comments} photoDocId={docId} photoUserId={userId} />

        {comments.length > 2 && (
          <a className="post__more" onClick={handleOpenModal}>
            Show more comments...
          </a>
        )}

        <CommentForm docId={docId} />
      </div>
    </div>
  );
};

export { CardSmall };
