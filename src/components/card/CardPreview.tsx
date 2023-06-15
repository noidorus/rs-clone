import React from 'react';
import { useAppSelector } from '../../hooks/redux.hook';
import { usePost } from '../providers/PostProvider';
import { CardModal } from './CardModal';
import { CardProps } from './props';

const CardPreview = ({ photo }: CardProps) => {
  const { user } = useAppSelector(({ profile }) => profile);
  const { likes, imageSrc } = photo;
  const { comments, setModal } = usePost();

  const handleOpenModal = () => {
    user && setModal(<CardModal photo={photo} user={user} />);
  };

  return (
    <>
      <a className="post-list__item post" onClick={handleOpenModal}>
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
      </a>
    </>
  );
};

export { CardPreview };
