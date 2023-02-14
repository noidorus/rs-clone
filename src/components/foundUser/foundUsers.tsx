import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../types/types';

function FoundUser({ user }: { user: IUser }) {
  const { username, fullName, avatarData } = user;
  const src = avatarData?.avatarSrc || './images/icons/profile.jpg';

  return (
    <li>
      <Link
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: 0,
          margin: '10px 0',
        }}
        to={`/${username}`}
      >
        <img src={src} width="53" height="53" />
        <span>{username}</span>
        <span>({fullName})</span>
      </Link>
    </li>
  );
}

export default FoundUser;
