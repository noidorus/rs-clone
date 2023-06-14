import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { deletePhoto } from '../../../redux/slices/dashboardSlice';
import { deleteProfilePhoto } from '../../../redux/slices/profileSlice';
import { IPhotoDoc, IUserProfile } from '../../../types/types';
import { useComments } from '../../providers/CommentsProvider';
import { useModal } from '../../providers/ModalProvider';
import './post-header.scss';

interface PostHeaderProps {
  user: IUserProfile;
  photoData: IPhotoDoc;
}

function PostHeader({ user, photoData }: PostHeaderProps) {
  const { username, fullName, avatarData } = user;
  const avatar = avatarData?.avatarSrc || './images/icons/profile.jpg';

  const { loggedUser } = useAppSelector(({ userInfo }) => userInfo);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { loadingOn, loadingOf } = useComments(); // Rename
  const { closeModal } = useModal();

  const isMyPhoto = loggedUser?.username == username;

  const handleDeletePhoto = async (): Promise<void> => {
    const { imagePath, docId } = photoData;
    loadingOn();
    if (pathname === '/') {
      await dispatch(deletePhoto({ imagePath, docId }));
    } else {
      await dispatch(deleteProfilePhoto({ imagePath, docId }));
    }
    closeModal();
    loadingOf();
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
