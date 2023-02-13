import React, { useState, SetStateAction, Dispatch, useContext } from 'react';
import { loadImageToStorage } from '../../firebase/storage';
import { updateUserAvatar } from '../../firebase/services';
import UserContext from '../../context/user-context';
import { User } from 'firebase/auth';

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function UploadImageModal({ setShowModal }: Props) {
  const user = useContext(UserContext) as User;

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

    loadImageToStorage(imgUpload, (url: string, imageId: string) => {
      updateUserAvatar(url, user.displayName);
    });
  };

  return (
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
        onSubmit={handleSubmit}
      >
        <h3>Update Avatar!</h3>
        <input type="file" onChange={(e) => handleUpload(e.target.files)} />
        <button type="submit">Update Avatar</button>

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
  );
}
