import React, { useEffect, useState } from 'react';
import { IUserProfile } from '../../../types/types';
import { PreviewUser } from '../../userPreview/UserPreview';

import { getUsersByUserId } from '../../../firebase/services';
import './styles.scss';

interface PropsFollowersList {
  userIds: string[];
  title: string;
}

export const FollowersList = ({ userIds, title }: PropsFollowersList) => {
  const [users, setUsers] = useState<IUserProfile[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersArr = await getUsersByUserId(userIds);
      setUsers(usersArr);
    };

    if (userIds.length > 0) {
      getUsers();
    }
  }, [userIds]);

  const elements = users.map((user, i) => {
    return (
      <PreviewUser
        key={i}
        name={user.username}
        avatar={user.avatarData?.avatarSrc}
      />
    );
  });

  return (
    <div className="follow-modal">
      <h3 className="follow-modal__title">{title}</h3>
      <ul className="follow-modal__list">{elements}</ul>
    </div>
  );
};
