import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../types/types';

function PreviewUser({ user }: { user: IUser }) {
  const { username, fullName, avatarData } = user;
  const src = avatarData?.avatarSrc || './images/icons/profile.jpg';

  return (
    <div>
      <Link
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: 0,
          margin: '10px 0',
        }}
        to={`/${username}`}
      >
        <img src={src} width="53" height="53" style={{
          borderRadius: '50%'
        }}/>
        <span>{username}</span>
        <span>({fullName})</span>
      </Link>
    </div>
  );
}

export default PreviewUser;
