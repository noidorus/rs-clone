import React, { useContext, useEffect, useState } from 'react';
import { IUserProfile } from '../../types/types';
import UserContext from '../../context/user-context';
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
  const loggedUser = useContext(UserContext);
  const { username, avatarData } = user;
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  
  useEffect(() => {
    if (loggedUser) {
      const isLogged = loggedUser.displayName == username;
      setIsLoggedUser(isLogged);
    }
  }, [user]);

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <ProfileAvatar
        isLoggedUser={isLoggedUser}
        avatarData={avatarData ? avatarData : { avatarSrc: '', imagePath: '' }}
      />

      <div>
        <h4>{username}</h4>
        {}
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
