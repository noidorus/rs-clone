import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FollowersList } from '../../modals/followersModal/FollowersModal';
import {
  selectIsFolowingProfile,
  useAppDispatch,
  useAppSelector,
} from '../../../hooks/redux.hook';
import { ROUTES } from '../../../constants/routes';
import { toggleFollow } from '../../../redux/slices/userCenter';
import { useModal } from '../../providers/ModalProvider';
import { IUserProfile } from '../../../types/types';

interface Props {
  user: IUserProfile;
}

export default function UserHeader({ user }: Props) {
  const { username, avatarData, userId, docId, following, followers } = user;

  const isFollowingProfile = selectIsFolowingProfile();
  const { loggedUser } = useAppSelector(({ userCenter }) => userCenter);
  const photosCount = useAppSelector(
    ({ photos }) => photos.profilePhotos.length
  );
  const { setModal } = useModal();
  const navigate = useNavigate();

  const isLoggedUserProfile = loggedUser
    ? loggedUser.username == username
    : false;

  const dispatch = useAppDispatch();
  const handleToggleFollow = () => {
    if (loggedUser) {
      dispatch(
        toggleFollow({
          isFollowingProfile,
          userId,
          docId,
          loggedUserId: loggedUser.userId,
          loggedDocId: loggedUser.docId,
        })
      );
    }
  };

  const handleOpenModal = (listType: 'Followers' | 'Followings') => {
    const props = {
      userIds: listType === 'Followers' ? followers : following,
      title: listType,
    };

    setModal(<FollowersList {...props} />);
  };

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
            <button
              className="button"
              onClick={() => navigate(ROUTES.SETTINGS)}
            >
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
            <span className="shared__value">{followers.length}</span>
            <span
              className="shared__name shared__name--actions"
              onClick={() => handleOpenModal('Followers')}
            >
              Followers
            </span>
          </li>
          <li className="shared__item">
            <span className="shared__value">{following.length}</span>
            <span
              className="shared__name shared__name--actions"
              onClick={() => handleOpenModal('Followings')}
            >
              Following
            </span>
          </li>
        </ul>
      </div>
    </header>
  );
}
