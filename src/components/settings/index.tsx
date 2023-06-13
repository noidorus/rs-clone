import React, { useState } from 'react';

import UpdateInfoForm from '../forms/updateInfoForm/UpdateInfoForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { PacmanLoader } from 'react-spinners';
import { ImageFormView } from '../forms/imgForm/ImgFormView';
import { updateAvatar } from '../../redux/slices/userCenter';
import { useModal } from '../providers/ModalProvider';
import type { Props } from './props';

import './styles.scss';

const ProfileSettings = ({ user }: Props) => {
  const [form, setForm] = useState<'avatar' | 'info'>('avatar');
  const { uploadLoading } = useAppSelector(({ userCenter }) => userCenter);

  const { closeModal } = useModal();
  const dispatch = useAppDispatch();

  const submitCallback = async (img: File) => {
    const { docId, avatarData } = user;

    dispatch(
      updateAvatar({
        img,
        docId,
        oldAvatarPath: avatarData?.imagePath,
      })
    ).then(() => {
      closeModal();
    });
  };

  const content =
    form === 'avatar' ? (
      <ImageFormView submitCallback={submitCallback} title="Update avatar" />
    ) : (
      <UpdateInfoForm />
    );

  return (
    <div className="edit__forms">
      <ul className="edit__controls">
        <li
          className={
            form === 'avatar'
              ? 'controls__item controls__item--activ'
              : 'controls__item'
          }
          onClick={() => setForm('avatar')}
        >
          Update avatar
        </li>
        <li
          className={
            form === 'info'
              ? 'controls__item controls__item--activ'
              : 'controls__item'
          }
          onClick={() => setForm('info')}
        >
          Edit info
        </li>
      </ul>

      {content}

      {uploadLoading && (
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

export { ProfileSettings };
