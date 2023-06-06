import React, { useState } from 'react';
import { sendPhotoDataToFirestore } from '../../firebase/services';
import UploadImageModal from '../modal/modal';

import { IPhotoDoc } from '../../types/types';
import PhotosContext from '../../context/photos-context';
import { useAppSelector } from '../../hooks/redux.hook';

interface Props {
  isMainPage: boolean;
  profileUsername?: string;
}

export default function LoadPhotoButton({
  isMainPage,
  profileUsername,
}: Props) {
  const { loggedUser } = useAppSelector(({ auth }) => auth);
  // const { photos, setPhotos } = useContext(PhotosContext);

  const [showModal, setShowModal] = useState(false); // потом поменять на false
  const [caption, setCaption] = useState('');

  // send Data to FireStore after sending to Storage
  const callback = async (url: string, imagePath: string): Promise<void> => {
    if (loggedUser) {
      const imageData = {
        caption: caption,
        comments: [],
        dateCreated: Date.now(),
        imageSrc: url,
        likes: [],
        imagePath: imagePath,
        userId: loggedUser.userId,
      };

      if (loggedUser.displayName == profileUsername || isMainPage) {
        const docId = await sendPhotoDataToFirestore(imageData);
        const photoDoc = { ...imageData, docId };
        // setPhotos([photoDoc, ...photos]);
      } else {
        await sendPhotoDataToFirestore(imageData);
      }

      setShowModal(false);
      setCaption('');
    }
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
