import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import {
  deleteProfilePhoto,
  deletePhoto,
} from '../../../redux/slices/photosSlice';
import { IPhotoDoc, IUserProfile } from '../../../types/types';
import { usePost } from '../../providers/PostProvider';
import './post-header.scss';

interface PostHeaderProps {
  user: IUserProfile;
  photoData: IPhotoDoc;
}

function PostHeader({ user, photoData }: PostHeaderProps) {
  const { username, fullName, avatarData } = user;
  const avatar = avatarData?.avatarSrc || './images/icons/profile.jpg';

  const { loggedUser } = useAppSelector(({ userCenter }) => userCenter);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { setLoading, setModal } = usePost();

  const isMyPhoto = loggedUser?.username == username;

  const handleDeletePhoto = async (): Promise<void> => {
    const { imagePath, docId } = photoData;
    setLoading(true);
    if (pathname === '/') {
      await dispatch(deletePhoto({ imagePath, docId }));
    } else {
      await dispatch(deleteProfilePhoto({ imagePath, docId }));
    }
    setModal(null);
    setLoading(false);
  };

  return (
    <header className="post-header">
      <div className="post-header__user user">
        <Link className="user__link" to={`/${username}`}>
          <div className="user__image-wrapper">
            <img className="user__image" src={avatar} width="32" />
          </div>
          <div className="user__info">
            <span className="user__name">{username}</span>
            <span className="user__full-name">({fullName})</span>
          </div>
        </Link>
      </div>

      {isMyPhoto && (
        <button
          className="post-header__delete button button--delete"
          onClick={handleDeletePhoto}
        ></button>
      )}
    </header>
  );
}

export default PostHeader;
