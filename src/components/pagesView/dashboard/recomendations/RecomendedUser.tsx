import React, { useState } from 'react';
import { useAppDispatch } from '../../../../hooks/redux.hook';
import { toggleLoggedUserFollow } from '../../../../redux/slices/userCenter';
import { IUserProfile } from '../../../../types/types';
import { UserPreview } from '../../../userPreview/UserPreview';

type PropsRecommendedUser = {
  user: IUserProfile;
  loggedUser: IUserProfile;
};

export function RecommendedUser({ user, loggedUser }: PropsRecommendedUser) {
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const dispatch = useAppDispatch();
  const { docId, userId } = user;

  const addFollow = async () => {
    await dispatch(
      toggleLoggedUserFollow({
        isFollowingProfile,
        userId,
        docId,
        loggedUserId: loggedUser.userId,
        loggedDocId: loggedUser.docId,
      })
    );

    if (!isFollowingProfile) {
      setIsFollowingProfile(true);
    } else {
      setIsFollowingProfile(false);
    }
  };

  return (
    <li className="recomendations__item">
      <UserPreview name={user.username} avatar={user.avatarData?.avatarSrc} />
      <button
        className="button button--transparent"
        onClick={() => addFollow()}
      >
        {isFollowingProfile ? 'Unfollow' : 'Follow'}
      </button>
    </li>
  );
}
