import React, { useEffect, useState } from 'react';

import { UserPreview } from '../userPreview/UserPreview';
import { IUserProfile } from '../../types/types';
import { SearchResultProps } from './props';

const SearchResult = ({ users, searchValue }: SearchResultProps) => {
  const [usersVisble, setUsersVisible] = useState<IUserProfile[]>([]);

  useEffect(() => {
    const filteredUsers = users.filter(
      (user) =>
        user.username.includes(searchValue) ||
        user.fullName.toLowerCase().includes(searchValue)
    );

    setUsersVisible(filteredUsers);
  }, [searchValue]);

  if (!usersVisble.length) {
    return <div className="search-block__empty">No recent searches.</div>;
  }

  const elements = usersVisble.map((user, index) => {
    return (
      <li className="results__item" key={index}>
        <UserPreview
          key={user.userId}
          name={user.username}
          avatar={user.avatarData?.avatarSrc}
        />
      </li>
    );
  });

  return <ul className="search__results results">{elements}</ul>;
};

export default SearchResult;
