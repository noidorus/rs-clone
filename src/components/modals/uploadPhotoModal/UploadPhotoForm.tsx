import React, { useState } from 'react';
import { PacmanLoader } from 'react-spinners';

import {
  uploadPhoto,
  uploadProfilePhoto,
} from '../../../redux/slices/mainPageSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { IUserProfile } from '../../../types/types';
import { useModal } from '../../providers/ModalProvider';

import { ImageFormView } from '../../forms/imgForm/ImgFormView';

import './styles.scss';

interface Props {
  page: 'main' | 'profile';
}

const UploadPhotoForm = ({ page }: Props) => {
  const [caption, setCaption] = useState('');
  const { closeModal } = useModal();
  const dispatch = useAppDispatch();
  const { username, userId } = useAppSelector(
    ({ user }) => user.loggedUser
  ) as IUserProfile;
  const profileUsername = useAppSelector(
    ({ profile }) => profile.user?.username
  );

  const { uploading } = useAppSelector((state) => state.photos);

  const submitCallback = async (img: File) => {
    if (page === 'profile' && profileUsername === username) {
      await dispatch(uploadProfilePhoto({ img, caption, userId }));
    } else if (page === 'main') {
      await dispatch(uploadPhoto({ img, caption, userId }));
    } else {
      await dispatch(uploadPhoto({ img, caption, userId, update: false }));
    }
    closeModal();
  };

  return (
    <div className="upload-photo__form">
      <ImageFormView submitCallback={submitCallback} title={'Upload Image'}>
        {
          <textarea
            className="photo-form__text"
            placeholder="Your caption:"
            rows={3}
            onChange={({ target }) => setCaption(target.value.trim())}
          />
        }
      </ImageFormView>
      {uploading && (
        <>
          <div className="spinner">
            <PacmanLoader color="blue" size={45} />
          </div>
          <div className="shadow" />
        </>
      )}
    </div>
  );
};

export { UploadPhotoForm };
