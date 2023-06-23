import React, { useEffect, useState } from 'react';

import { getAllUsers } from '../../../../firebase/services';
import { shuffle } from '../../../../helpers/helpers';
import { IUserProfile } from '../../../../types/types';
import { UserPreview } from '../../../userPreview/UserPreview';
import { RecommendedUser } from './RecomendedUser';

import './styles.scss';

type PropsRecomendations = {
  userData: IUserProfile;
};

export function Recomendations({ userData }: PropsRecomendations) {
  const [users, setUsers] = useState<IUserProfile[]>([]);

  const { following, userId, username, avatarData } = userData;

  useEffect(() => {
    getAllUsers().then((data) => {
      data = data.filter(
        (el) => !following.includes(el.userId) && el.userId !== userId
      );
      data = shuffle(data).slice(0, 5);
      setUsers(data);
    });
  }, []);

  const elements = users.map((user) => {
    return (
      <RecommendedUser key={user.userId} user={user} loggedUser={userData} />
    );
  });

  return (
    <div className="recomendations">
      <UserPreview name={username} avatar={avatarData?.avatarSrc} />
      <h3 className="recomendations__title">Suggestions for you</h3>
      <ul className="recomendations__list">{elements}</ul>
    </div>
  );
}
