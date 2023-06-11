import React, { useState } from 'react';
import { PacmanLoader } from 'react-spinners';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { IUserProfile } from '../../../types/types';
import { useModal } from '../../providers/ModalProvider';

import { ImageFormView } from '../../forms/imgForm/ImgFormView';
import { updateAvatar } from '../../../redux/slices/authSlice';

const UpdateAvatarForm = () => {
  const { closeModal } = useModal();
  const dispatch = useAppDispatch();
  const { docId, avatarData } = useAppSelector(
    ({ user }) => user.loggedUser
  ) as IUserProfile;

  const { uploadLoading } = useAppSelector(({ profile }) => profile);

  const submitCallback = async (img: File) => {
    dispatch(
      updateAvatar({ img, docId: docId, oldAvatarPath: avatarData?.imagePath })
    ).then(() => {
      closeModal();
    });
  };

  return (
    <>
      <ImageFormView title="Update avatar" submitCallback={submitCallback} />
      {uploadLoading && (
        <>
          <div className="spinner">
            <PacmanLoader color="blue" size={45} />
          </div>
          <div className="shadow" />
        </>
      )}
    </>
  );
};

export { UpdateAvatarForm };
