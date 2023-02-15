import React, { useContext, useEffect, useState } from 'react';
import { IUserProfile } from '../../types/types';
import UserContext from '../../context/user-context';
import ProfileAvatar from '../profileAvatar/profile-avatar';
import { isFollowingUserProfile } from '../../firebase/services';

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

  const { username, avatarData, userId } = user;
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);

  const isLoggedUserProfile = loggedUser
    ? loggedUser.displayName == username
    : false;

  useEffect(() => {
    async function checkIsFollowingProfile() {
      if (!isLoggedUserProfile && loggedUser?.displayName && userId) {
        const isFollowing = await isFollowingUserProfile(
          loggedUser.displayName,
          userId
        );
        setIsFollowingProfile(isFollowing);
      }
    }
    checkIsFollowingProfile();
  }, [loggedUser?.displayName, userId]);

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <ProfileAvatar
        isLoggedUserProfile={isLoggedUserProfile}
        avatarData={avatarData ? avatarData : { avatarSrc: '', imagePath: '' }}
      />

      <div>
        <h4>{username}</h4>
        {isLoggedUserProfile ? (
          <button>Edit profile</button>
        ) : (
          <button>{isFollowingProfile ? 'Unfollow' : 'Follow'}</button>
        )}
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
