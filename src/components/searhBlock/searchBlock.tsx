import React, { useEffect, useRef, useState } from 'react';
import { getAllUsers } from '../../firebase/services';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { IUserProfile } from '../../types/types';
import { Search } from '../search/search';
import { PreviewUser } from '../userPreview/UserPreview';
import './searchBlock.scss';

function filteredUsers(users: IUserProfile[], value: string) {
  const filteredUsers = value
    ? users.filter(
        (user) =>
          user.username.toUpperCase().includes(value.toUpperCase()) ||
          user.fullName.toUpperCase().includes(value.toUpperCase())
      )
    : [];
  return filteredUsers;
}

export type propsCloseSearchBlock = {
  closeSearchBlock: () => void;
};

function SearchBlock(props: propsCloseSearchBlock) {
  const [value, setValue] = useState('');
  const [users, setUsers] = useState<IUserProfile[]>([]);
  const [usersVisble, setUsersVisible] = useState<IUserProfile[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'success'
  );
  const searchRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(searchRef, props.closeSearchBlock);

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setStatus('success');
        setUsers(data as IUserProfile[]);
      })
      .catch((err) => {
        setStatus('error');
      });
  }, []);

  useEffect(() => {
    setUsersVisible(filteredUsers(users, value));
  }, [value]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const inputText = event.target.value;
    setValue(inputText);
  }

  function clearInput() {
    setValue('');
  }
  return (
    <div ref={searchRef} className="search">
      <header className="search__header">
        <h2 className="search__title">Search</h2>
        <Search
          value={value}
          handleChange={handleChange}
          clearInput={clearInput}
        />
      </header>
      <div className="search__inner">
        {status === 'success' && (
          <ul className="search__results results">
            {usersVisble.map((user, index) => {
              return (
                <li
                  className="results__item"
                  key={index}
                  onClick={props.closeSearchBlock}
                >
                  <PreviewUser
                    key={user.userId}
                    name={user.username}
                    avatar={
                      user.avatarData?.avatarSrc || './images/icons/profile.jpg'
                    }
                  />
                </li>
              );
            })}
          </ul>
        )}
        {!usersVisble.length && (
          <div className="search__empty">No recent searches.</div>
        )}
      </div>
    </div>
  );
}

export default SearchBlock;
