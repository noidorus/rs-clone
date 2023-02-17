import React from 'react';
import { Link } from 'react-router-dom';
import { IUser, IUserProfile } from '../../types/types';
import './foundUsers.scss';

function PreviewUser({ user }: { user: IUserProfile }) {
  const { username, fullName, avatarData } = user;
  const src = avatarData?.avatarSrc || './images/icons/profile.jpg';

  return (
    <div className='user'>
      <Link
        className='user__link'
        to={`/${username}`}
      >
        <div className='user__image-wrapper'>
          <img className='user__image' src={src} width="44" height="44"/>
        </div>
        <div className='user__info'>
          <span className='user__name'>{username}</span>
          <span className='user__full-name'>({fullName})</span>
        </div>
      </Link>
    </div>
  );
}

export default PreviewUser;
