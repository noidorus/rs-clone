import React, { useState } from 'react';

import UpdateInfoForm from '../../forms/updateInfoForm/UpdateInfoForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { ImageFormView } from '../../forms/imgForm/ImgFormView';
import { updateAvatar } from '../../../redux/slices/userCenter';
import type { Props } from './props';

import './styles.scss';
import { PacmanSpinner } from '../../spinner/spinner';

const ProfileSettings = ({ user }: Props) => {
  const [form, setForm] = useState<'avatar' | 'info'>('avatar');
  const { loading } = useAppSelector(({ userCenter }) => userCenter);
  const dispatch = useAppDispatch();

  const submitCallback = async (img: File) => {
    const { docId, avatarData } = user;

    dispatch(
      updateAvatar({
        img,
        docId,
        oldAvatarPath: avatarData?.imagePath,
      })
    );
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

        <PacmanSpinner loading={loading} />
      </div>
    </section>
  );
};

export { ProfileSettings };
