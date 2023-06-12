import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { deletePhotoFromFirestore } from '../../firebase/services';
import { deletePhotoFromStorage } from '../../firebase/storage';
import { useAppSelector } from '../../hooks/redux.hook';
import { IPhotoDoc, IUserProfile } from '../../types/types';
import './post-header.scss';

interface PostHeaderProps {
  user: IUserProfile;
  photoData?: IPhotoDoc;
  closeModal?: () => void;
}

function PostHeader({ user, photoData, closeModal }: PostHeaderProps) {
  const { username, fullName, avatarData } = user;
  const avatar = avatarData?.avatarSrc || './images/icons/profile.jpg';

  const loggedUser = useAppSelector(({ user }) => user.loggedUser);

  const isMyPhoto = loggedUser?.displayName == username;

  const handleDeletePhoto = async (): Promise<void> => {
    if (photoData) {
      const storagePath = photoData.imagePath;
      const docId = photoData.docId;
      // const newPhotos = photos.filter((elem) => elem.docId !== docId);

      // try {
      //   await deletePhotoFromStorage(storagePath);
      //   await deletePhotoFromFirestore(docId);

      //   setPhotos(newPhotos);
      //   closeModal ? closeModal() : null;
      // } catch (e) {
      //   console.log(e);
      // }
    }
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

      {isMyPhoto ? (
        <button
          className="post-header__delete button button--delete"
          onClick={handleDeletePhoto}
        ></button>
      ) : null}
    </header>
  );
}

export default PostHeader;
