import React, { useState, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import UserContext from '../../context/user-context';
import UploadImageModal from '../modal/modal';
import { updateUserAvatar } from '../../firebase/services';

export default function ProfileAvatar({ avatar }: { avatar: string }) {
  const [showModal, setShowModal] = useState(false);
  const user = useContext(UserContext);

  const callback = (url: string, imagePath: string) => {
    updateUserAvatar(url, imagePath, user?.displayName);
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
        onClick={() => setShowModal(true)}
      >
        <img
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
          }}
          src={avatar}
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
