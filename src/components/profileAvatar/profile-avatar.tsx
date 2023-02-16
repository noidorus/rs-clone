import React, { useState, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import UserContext from '../../context/user-context';
import UploadImageModal from '../modal/modal';
import { updateUserAvatar } from '../../firebase/services';
import { deletePhotoFromStorage } from '../../firebase/storage';

interface Props {
  avatarData: {
    avatarSrc: string;
    imagePath: string;
  } | null;
  isLoggedUserProfile: boolean;
}

export default function ProfileAvatar({
  avatarData,
  isLoggedUserProfile,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const user = useContext(UserContext);
  const oldAvatarPath = avatarData?.imagePath;

  const [avatarSrc, setAvatarSrc] = useState(avatarData?.avatarSrc);

  const callback = (url: string, imagePath: string) => {
    if (oldAvatarPath) {
      deletePhotoFromStorage(oldAvatarPath);
    }
    
    updateUserAvatar(url, imagePath, user?.displayName);
    setAvatarSrc(url);
    setShowModal(false);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '150px',
          height: '150px',
          border: '1px solid black',
          borderRadius: '50%',
        }}
        onClick={isLoggedUserProfile ? () => setShowModal(true) : undefined}
      >
        <img
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
          }}
          src={avatarSrc ? avatarSrc : './images/icons/profile.jpg'}
          alt="avatar"
        />
        {/* <Skeleton circle height={150} width={150} count={1} /> */}
      </div>

      {showModal ? (
        <UploadImageModal
          setShowModal={setShowModal}
          callback={callback}
          type={'avatar'}
        />
      ) : null}
    </>
  );
}
