import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import UploadImageModal from '../modal/modal';

export default function ProfileAvatar({ avatar }: { avatar: string }) {
  const [showModal, setShowModal] = useState(false);

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

      {showModal ? <UploadImageModal setShowModal={setShowModal} /> : null}
    </>
  );
}
