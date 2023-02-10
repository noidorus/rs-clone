import React, { useState, useContext } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import FirebaseContext from '../../context/firebase-context';
import UserContext from '../../context/user-context';
import { uuidv4 } from '@firebase/util';
import { setPhotoData } from '../../firebase/services';
import { User } from 'firebase/auth';

export default function LoadPhotoButton() {
  const firebase = useContext(FirebaseContext)?.firebase;
  const storage = getStorage(firebase);
  const user = useContext(UserContext) as User;

  const [showModal, setShowModal] = useState(true);
  const [imgUpload, setImgUpload] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [imgError, setImgError] = useState('');

  // submit Image to FirebaseStorage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!imgUpload) {
      setImgError('Please select file!');
      return;
    }
    const imageId = uuidv4();
    const uploadPath = `/images/${imageId}`; // geting the image path
    const storageRef = ref(storage, uploadPath); // getting the storageRef

    uploadBytes(storageRef, imgUpload)
      .then(() => {
        getDownloadURL(storageRef).then((url) => {
          setPhotoData(imageId, url, user.uid, caption);
          setShowModal(false);
          setImgUpload(null);
          setCaption('');
        });
      })
      .catch((err) => console.log(err.message));
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
            {imgError && <p>{imgError}</p>}
            <input type="file" onChange={(e) => handleUpload(e.target.files)} />

            <textarea
              placeholder="Your caption:"
              rows={3}
              onChange={(e) => setCaption(e.target.value.trim())}
            />

            <button type="submit">Upload Photo!</button>
            <button onClick={() => setShowModal(false)}>Close modal</button>
          </form>
        </div>
      ) : null}
    </>
  );
}
