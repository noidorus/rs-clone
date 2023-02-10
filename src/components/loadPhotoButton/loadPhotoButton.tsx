import React, { useState, useContext } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import FirebaseContext from '../../context/firebase-context';
import { uuidv4 } from '@firebase/util';

export default function LoadPhotoButton() {
  const firebase = useContext(FirebaseContext)?.firebase;
  const storage = getStorage(firebase);

  const [showModal, setShowModal] = useState(true);
  const [imgUpload, setImgUpload] = useState<File | null>(null);
  const [imgError, setImgError] = useState('');

  // submit Image to FirebaseStorage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (imgUpload) {
      const uploadPath = `images/${uuidv4()}`; // geting the image path
      const storageRef = ref(storage, uploadPath); // getting the storageRef
      uploadBytes(storageRef, imgUpload)
        .then((snapshot) => console.log(snapshot, 'Photo Uploaded!'))
        .catch((err) => console.log(err.message));
    } else {
      setImgError('Please select file!');
      return;
    }
  };

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
      <button type="button" onClick={() => setShowModal(true)}>
        Load Photo
      </button>
      {showModal ? (
        <div
          style={{
            // Временные стили
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
          }}
        >
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
            <h3>Create Publication!</h3>
            <input type="file" onChange={(e) => handleUpload(e.target.files)} />

            {imgError && <p>{imgError}</p>}

            <button type="submit">Upload Photo!</button>
            <button onClick={() => setShowModal(false)}>Close modal</button>
          </form>
        </div>
      ) : null}
    </>
  );
}
