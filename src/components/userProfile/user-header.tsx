import React, { Dispatch, useContext, useEffect, useState } from 'react';
import { IUserProfile } from '../../types/types';
import UserContext from '../../context/user-context';
import ProfileAvatar from '../profileAvatar/profile-avatar';
import EditProfileButton from '../editProfileButton/editprofile';


import { getLoggedUserData } from '../../hooks/getLoggedUserData';
import { isFollowingUserProfile, toggleFollow } from '../../firebase/services';

interface Props {
  user: IUserProfile;
  followersCount: number;
  setFollowersCount: Dispatch<React.SetStateAction<number>>;
}

export default function UserHeader({
  user,
  followersCount,
  setFollowersCount,
}: Props) {
  const loggedUser = useContext(UserContext).user;
  const loggedUserData = getLoggedUserData(loggedUser?.uid);

  const { username, avatarData, userId, docId, following } = user;
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);

  const isLoggedUserProfile = loggedUser
    ? loggedUser.displayName == username
    : false;

  const handleToggleFollow = () => {
    setIsFollowingProfile(!isFollowingProfile);

    setFollowersCount(
      isFollowingProfile ? followersCount - 1 : followersCount + 1
    );
    toggleFollow(
      isFollowingProfile,
      userId,
      docId,
      loggedUserData?.userId,
      loggedUserData?.docId
    );
  };

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
        avatarData={avatarData ? avatarData : null}
      />

      <div>
        <h4>{username}</h4>
        {isLoggedUserProfile ? (
          <EditProfileButton  loggedUserData={loggedUserData} />
        ) : (
          <button onClick={handleToggleFollow}>
            {isFollowingProfile ? 'Unfollow' : 'Follow'}
          </button>
        )}
        <div
          style={{
            display: 'flex',
            gap: '1em',
          }}
        >
          <p>{0} - Publication</p>
          <p>{followersCount} - Followers</p>
          <p>{following.length} - Followings</p>
        </div>
      </div>
    </div>
  );
}
