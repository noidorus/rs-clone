import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/user-context';
import { IPhotoDoc, IUserProfile } from '../../types/types';
import { toggleLike } from '../../firebase/services';
import './like.scss';
import { User } from 'firebase/auth';

interface LikeProps {
  photo: IPhotoDoc;
}

export default function Like({ photo }: LikeProps) {
  const { likes, docId } = photo;
  const loggedUser = useContext(UserContext).user as User;

  const [likesCount, setLikesCount] = useState(likes.length);
  const [isLikedPhoto, setIsLikedPhoto] = useState(false);

  const handleToggleLike = () => {
    setIsLikedPhoto(!isLikedPhoto);
    setLikesCount(isLikedPhoto ? likesCount - 1 : likesCount + 1);
    toggleLike(isLikedPhoto, docId, loggedUser.uid);
  };

  useEffect(() => {
    function checkIsLikedPhoto() {
      if (loggedUser) {
        const likeIndex = likes.findIndex((val) => val == loggedUser.uid);
        likeIndex > -1 ? setIsLikedPhoto(true) : setIsLikedPhoto(false);
      }
    }
    checkIsLikedPhoto();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
      }}
    >
      <div
        className={isLikedPhoto ? 'like-activ' : 'like'}
        onClick={() => handleToggleLike()}
      />

      <div>
        {likesCount !== 0 && (
          <span>
            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
          </span>
        )}
      </div>
    </div>
  );
}
