import React from 'react';
import { IUserProfile } from '../../types/types';

import ProfileAvatar from '../profileAvatar/profile-avatar';

interface Props {
  user: IUserProfile;
  followersCount: number;
  followingsCount: number;
}

export default function UserHeader({
  user,
  followersCount,
  followingsCount,
}: Props) {
  const { username } = user;

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <ProfileAvatar avatar={user.avatarData ? user.avatarData.avatarSrc : ''} />

      <div>
        <h4>{username}</h4>
        <div
          style={{
            display: 'flex',
            gap: '1em',
          }}
        >
          <p>{0} - Publication</p>
          <p>{followersCount} - Followers</p>
          <p>{followingsCount} - Followings</p>
        </div>
      </div>
    </div>
  );
}
