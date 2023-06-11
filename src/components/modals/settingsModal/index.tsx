import React, { useState } from 'react';

import { UpdateAvatarForm } from './UpdateAvatarForm';

import './styles.scss';

interface Props {
  title?: string;
}

const ProfileSettings = (props: Props) => {
  const [form, setForm] = useState<'avatar' | 'info'>('avatar');

  const content = <UpdateAvatarForm />;

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
    </div>
  );
};

export { ProfileSettings };
