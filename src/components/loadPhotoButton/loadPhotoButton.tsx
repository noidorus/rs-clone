import React, { useState, useContext } from 'react';
import UserContext from '../../context/user-context';
import { setPhotoData } from '../../firebase/services';
import { User } from 'firebase/auth';
import UploadImageModal from '../modal/modal';

export default function LoadPhotoButton() {
  const user = useContext(UserContext) as User;

  const [showModal, setShowModal] = useState(false); // потом поменять на false
  const [caption, setCaption] = useState('');

  // send Data to FireStore afte sending to Storage
  const callback = (url: string, imagePath: string) => {
    setPhotoData(imagePath, url, user.uid, caption);
    setShowModal(false);
    setCaption('');
  };

  return (
    <>
      <a
        className={
          showModal
            ? 'main-nav__link main-nav__link--create main-nav__link--active'
            : 'main-nav__link main-nav__link--create'
        }
        onClick={() => setShowModal(true)}
      >
        <span className="main-nav__text">Create</span>
      </a>
      {showModal ? (
        <UploadImageModal
          setCaption={setCaption}
          setShowModal={setShowModal}
          callback={callback}
          type={'photos'}
        />
      ) : null}
    </>
  );
}
