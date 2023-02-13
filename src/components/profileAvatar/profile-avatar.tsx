import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

export default function ProfileAvatar() {
  const [showModal, setShowModal] = useState(false);
  const [imgUpload, setImgUpload] = useState<File | null>(null);
  const [imgError, setImgError] = useState('');

  // console.log('modal', modal);

  const handleUpload = (filesList: FileList | null) => {
    const img = filesList ? filesList[0] : null;
    setImgError('');

    if (!img) {
      setImgError('Please select file!');
      return;
    }

    if (!img.type.includes('image')) {
      setImgError('Please select image file');
      return;
    }

    setImgError('');
    setImgUpload(img);
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
        <img src="" alt="avatar" />
        {/* <Skeleton circle height={150} width={150} count={1} /> */}
      </div>

      {showModal ? (
        <div>
          <form
            style={{
              // Временные стили
              border: '1px solid black',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              top: '50%',
              right: '50%',
              width: '400px',
              height: '400px',
              transform: 'translate(50%, -50%)',
            }}
          >
            <h3>Update Avatar!</h3>
            <input type="file" onChange={(e) => handleUpload(e.target.files)} />
            <button
              type="button"
              onClick={(e) => {
                setShowModal(false);
                setImgUpload(null);
              }}
            >
              Close modal
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
