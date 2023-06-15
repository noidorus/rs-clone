import React, { useEffect, useState } from 'react';
// import { toggleLike } from '../../../firebase/services';

import { useAppSelector } from '../../../hooks/redux.hook';
import { usePost } from '../../providers/PostProvider';

import './like.scss';

export default function Like() {
  const { likes, toggleLike } = usePost();
  const likesCount = likes.length;
  const [isLikedPhoto, setIsLikedPhoto] = useState(false);
  const { loggedUser } = useAppSelector(({ userInfo }) => userInfo);

  const handleToggleLike = (): void => {
    if (loggedUser) {
      toggleLike(isLikedPhoto);
    }
  };

  useEffect(() => {
    function checkIsLikedPhoto() {
      if (loggedUser) {
        const likeIndex = likes.findIndex((val) => val == loggedUser.userId);
        likeIndex > -1 ? setIsLikedPhoto(true) : setIsLikedPhoto(false);
      }
    }
    checkIsLikedPhoto();
  }, [likes]);

  return (
    <div className="like">
      <button
        className={
          isLikedPhoto ? 'like__action like__action--activ' : 'like__action'
        }
        onClick={() => handleToggleLike()}
      ></button>

      {likesCount !== 0 ? (
        <span className="like__value">
          {likesCount} {likesCount === 1 ? 'like' : 'likes'}
        </span>
      ) : (
        <span className="like__counter">
          {'Be the first to '}
          <button
            className="like__first"
            type="button"
            onClick={() => handleToggleLike()}
          >
            like this
          </button>
        </span>
      )}
    </div>
  );
}
