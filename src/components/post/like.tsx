import React, { useEffect, useState } from 'react';

import { toggleLike } from '../../firebase/services';
import { useAppSelector } from '../../hooks/redux.hook';

import './like.scss';

interface LikeProps {
  likes: string[];
  docId: string;
}

export default function Like({ likes, docId }: LikeProps) {
  const [likesCount, setLikesCount] = useState(likes.length);
  const [isLikedPhoto, setIsLikedPhoto] = useState(false);
  const { loggedUser } = useAppSelector(({ userInfo }) => userInfo);

  const handleToggleLike = (): void => {
    setIsLikedPhoto(!isLikedPhoto);
    setLikesCount(isLikedPhoto ? likesCount - 1 : likesCount + 1);
    // toggleLike(isLikedPhoto, docId, loggedUser?.userId);
  };

  useEffect(() => {
    function checkIsLikedPhoto() {
      if (loggedUser) {
        const likeIndex = likes.findIndex((val) => val == loggedUser.userId);
        likeIndex > -1 ? setIsLikedPhoto(true) : setIsLikedPhoto(false);
      }
    }
    checkIsLikedPhoto();
  }, []);

  return (
    <div className="like">
      <button
        className={
          isLikedPhoto ? 'like__action like__action--activ' : 'like__action'
        }
        onClick={() => handleToggleLike()}
      ></button>

      <div className="like__counter-wrapper">
        {likesCount !== 0 ? (
          <span className="like__value">
            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
          </span>
        ) : (
          <span className="like__counter">
            Be the first to{' '}
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
    </div>
  );
}
