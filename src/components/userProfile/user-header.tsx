import React, { useEffect, useState } from 'react';
import { IUserProfile } from '../../types/types';
import { isFollowingUserProfile, toggleFollow } from '../../firebase/services';

import { FollowersList } from './folowers-list';
import { useAppSelector } from '../../hooks/redux.hook';
import './user-header.scss';
import { useModal } from '../providers/ModalProvider';
import { ProfileSettings } from '../settings';

interface Props {
  user: IUserProfile;
}

export default function UserHeader({ user }: Props) {
  const [followersCount, setFollowersCount] = useState(user.followers.length);
  const { username, avatarData, userId, docId, following } = user;
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);

  const photosCount = useAppSelector(
    ({ photos }) => photos.profilePhotos.length
  );
  const { loggedUser } = useAppSelector(({ userCenter }) => userCenter);
  const { setModal } = useModal();

  const isLoggedUserProfile = loggedUser
    ? loggedUser.username == username
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
      loggedUser?.userId,
      loggedUser?.docId
    );
  };

  const openModal = () => {
    setModal(<ProfileSettings user={user} />);
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
    <header className="profile__header">
      <img
        className="profile__avatar"
        src={
          avatarData?.avatarSrc
            ? avatarData.avatarSrc
            : './images/icons/profile.jpg'
        }
        alt="avatar"
        width="150"
      />
      <div className="profile__info info">
        <header className="info__header">
          <h4 className="info__title">{username}</h4>
          {isLoggedUserProfile ? (
            <button className="button" onClick={openModal}>
              Edit profile
            </button>
          ) : (
            <button className="button" onClick={handleToggleFollow}>
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </header>
        <ul className="info__inner shared">
          <li className="shared__item">
            <span className="shared__value">{photosCount}</span>
            <span className="shared__name">Publication</span>
          </li>
          <li className="shared__item">
            <span className="shared__value">{followersCount}</span>
            <span
              className="shared__name shared__name--actions"
              // onClick={openModal}
            >
              Followers
            </span>
          </li>
          <li className="shared__item">
            <span className="shared__value">{following.length}</span>
            <span
              className="shared__name shared__name--actions"
              // onClick={openModal}
            >
              Following
            </span>
          </li>
        </ul>
      </div>
      {/* {isModalOpen && (
        <FollowersList
          user={user}
          modalName={modalName}
          closeModal={closeModal}
        />
      )} */}
    </header>
  );
}
