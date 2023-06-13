import React, { useState } from 'react';

import UpdateInfoForm from '../../forms/updateInfoForm/UpdateInfoForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { PacmanLoader } from 'react-spinners';
import { ImageFormView } from '../../forms/imgForm/ImgFormView';
import { updateAvatar } from '../../../redux/slices/userCenter';
import { useModal } from '../../providers/ModalProvider';
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
    <section className="settings">
      <h2 className="settings__title">Settings</h2>
      <div className="settings__forms">
        <ul className="settings__list">
          <li
            className={
              form === 'avatar' ? 'list__item list__item--activ' : 'list__item'
            }
            onClick={() => setForm('avatar')}
          >
            Update avatar
          </li>
          <li
            className={
              form === 'info' ? 'list__item list__item--activ' : 'list__item'
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
    </section>
  );
};

export { ProfileSettings };
