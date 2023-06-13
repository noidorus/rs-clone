import React, { useState } from 'react';

import { uploadPhoto } from '../../../redux/slices/dashboardSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { IUserProfile } from '../../../types/types';
import { useModal } from '../../providers/ModalProvider';

import { ImageFormView } from '../../forms/imgForm/ImgFormView';

import './styles.scss';
import PacmanSpinner from '../../spinner/spinner';
import { uploadProfilePhoto } from '../../../redux/slices/profileSlice';

interface Props {
  page: 'main' | 'profile' | 'settings';
}

const UploadPhotoModal = ({ page }: Props) => {
  const [caption, setCaption] = useState('');
  const { closeModal } = useModal();
  const dispatch = useAppDispatch();
  const { username, userId } = useAppSelector(
    ({ userInfo }) => userInfo.loggedUser
  ) as IUserProfile;
  const profileUsername = useAppSelector(
    ({ profile }) => profile.user?.username
  );

  const loading = useAppSelector(
    ({ dashboard, profile }) => dashboard.uploading || profile.loading
  );

  const submitCallback = async (img: File) => {
    if (page === 'profile' && profileUsername === username) {
      await dispatch(uploadProfilePhoto({ img, caption, userId }));
    } else if (page === 'main') {
      await dispatch(uploadPhoto({ img, caption, userId }));
    } else {
      await dispatch(
        uploadProfilePhoto({ img, caption, userId, update: false })
      );
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

      <PacmanSpinner loading={loading} />
    </div>
  );
};

export { UploadPhotoModal };
