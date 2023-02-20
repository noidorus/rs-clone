import React from 'react';
import { Link } from 'react-router-dom';
import { IUserProfile } from '../../types/types';
import './post-header.scss';

function PreviewUser({ user }: { user: IUserProfile }) {
  const { username, fullName, avatarData } = user;
  const src = avatarData?.avatarSrc || './images/icons/profile.jpg';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className="user">
        <Link className="user__link" to={`/${username}`}>
          <div className="user__image-wrapper">
            <img className="user__image" src={src} width="44" height="44" />
          </div>
          <div className="user__info">
            <span className="user__name">{username}</span>
            <span className="user__full-name">({fullName})</span>
          </div>
        </Link>
      </div>
      <div
        style={{
          height: '53px',
          cursor: 'pointer',
          display: 'flex',

          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
        onClick={() => console.log('hahaha')}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            fontSize: '2.5em'
          }}
        >
          ...
        </div>
      </div>
    </div>
  );
}

export default PreviewUser;
