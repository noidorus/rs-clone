import React, { useState, SetStateAction, Dispatch, useContext } from 'react';
import { loadImageToStorage } from '../../firebase/storage';

import './modal.scss';

type CallBackType = (url: string, imageId: string) => void;

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  callback: CallBackType;
  type: 'avatar' | 'photos';
  setCaption?: Dispatch<SetStateAction<string>>;
}

export default function UploadImageModal({
  callback,
  type,
  setShowModal,
  setCaption,
}: Props) {
  const [imgUpload, setImgUpload] = useState<File | null>(null);
  const [imgError, setImgError] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imgUpload) {
      setImgError('Please select file!');
      return;
    }

    loadImageToStorage(imgUpload, callback);
  };

  return (
    <div className='modal'>
      <div className='modal__inner'>
        <form
          style={{
            // Временные стили
            border: '1px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '400px',
            height: '400px',
            background: '#fff'
          }}
          onSubmit={handleSubmit}
        >
          {imgError && <p>{imgError}</p>}

          <h3>{type === 'avatar' ? 'Update Avatar!' : 'Upload Image!'}</h3>
          <input type="file" onChange={(e) => handleUpload(e.target.files)} />

          {setCaption ? (
            <textarea
              placeholder="Your caption:"
              rows={3}
              onChange={(e) => setCaption(e.target.value.trim())}
            />
          ) : null}

          <button type="submit">
            {type === 'avatar' ? 'Update Avatar!' : 'Upload Image!'}
          </button>
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
    </div>
  );
}
