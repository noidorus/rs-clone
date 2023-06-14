import React from 'react';
import { useAppSelector } from '../../hooks/redux.hook';
import { useComments } from '../providers/CommentsProvider';
import { useModal } from '../providers/ModalProvider';
import { CardModal } from './CardModal';
import { CardProps } from './props';

const CardPreview = ({ photo }: CardProps) => {
  const { user } = useAppSelector(({ profile }) => profile);
  const { comments } = useComments();
  const { setModal } = useModal();
  const { likes, imageSrc } = photo;

  const handleOpenModal = () => {
    user &&
      setModal(<CardModal comments={comments} photo={photo} user={user} />);
  };

  return (
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
  );
};

export { CardPreview };
