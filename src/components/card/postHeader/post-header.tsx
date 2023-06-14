import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useAppSelector } from '../../../hooks/redux.hook';
import { IPhotoDoc, IUserProfile } from '../../../types/types';
import './post-header.scss';

interface PostHeaderProps {
  user: IUserProfile;
  photoData: IPhotoDoc;
}

function PostHeader({ user, photoData }: PostHeaderProps) {
  const { username, fullName, avatarData } = user;
  const avatar = avatarData?.avatarSrc || './images/icons/profile.jpg';

  const { loggedUser } = useAppSelector(({ userInfo }) => userInfo);

  const isMyPhoto = loggedUser?.username == username;

  const { pathname } = useLocation();

  const handleDeletePhoto = async (): Promise<void> => {
    if (pathname === '/') {
      console.log('Is Main Page');
    } else {
      console.log('Is Profile Page');
    }

    // const storagePath = photoData.imagePath;
    // const docId = photoData.docId;
    // const newPhotos = photos.filter((elem) => elem.docId !== docId);

    // try {
    //   await deletePhotoFromStorage(storagePath);
    //   await deletePhotoFromFirestore(docId);

    //   setPhotos(newPhotos);
    //   closeModal ? closeModal() : null;
    // } catch (e) {
    //   console.log(e);
    // }
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
