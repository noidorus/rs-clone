import React from 'react';
import { useAppSelector } from '../../hooks/redux.hook';
import { usePost } from '../providers/PostProvider';
import { PostModal } from './PostModal';
import { CardProps } from './props';

const PostPreview = ({ photo }: CardProps) => {
  const { userProfile } = useAppSelector(({ userCenter }) => userCenter);
  const { likes, imageSrc } = photo;
  const { comments, setModal } = usePost();

  const handleOpenModal = () => {
    userProfile && setModal(<PostModal photo={photo} user={userProfile} />);
  };

  return (
    <li className="post-list__item post" onClick={handleOpenModal}>
      <div className="post__inner">
        <img className="post__image" src={imageSrc} />
        <div className="post__overlay overlay">
          {
            <>
              <div className="overlay__item">
                <div className="overlay__likes"></div>
                {likes.length !== 0 && (
                  <div className="overlay__text">{likes.length}</div>
                )}
              </div>
              <div className="overlay__item">
                <div className="overlay__comments"></div>
                {comments.length !== 0 && (
                  <div className="overlay__text">{comments.length}</div>
                )}
              </div>
            </>
          }
        </div>
      </div>
    </li>
  );
};

export { PostPreview };
