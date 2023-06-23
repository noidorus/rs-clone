import React, { useEffect, useRef, useState } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import { getAllUsers } from '../../firebase/services';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { IUserProfile } from '../../types/types';
import { SearchBlockProps } from './props';
import SearchResult from './SearchResult';

import './styles.scss';

function SearchBlock({ closeSearchBlock, showSearch }: SearchBlockProps) {
  const [value, setValue] = useState('');
  const [users, setUsers] = useState<IUserProfile[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'success'
  );
  const searchRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(searchRef, closeSearchBlock);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setStatus('success');
      setUsers(data);
    };

    fetchUsers();
  }, []);

  function clearInput() {
    setValue('');
  }

  const content = status === 'success' && (
    <SearchResult users={users} searchValue={value} />
  );

  return (
    <CSSTransition
      classNames="search__node"
      addEndListener={(node, done) =>
        node.addEventListener('transitionend', done, false)
      }
      in={showSearch}
    >
      <div ref={searchRef} className="search">
        <header className="search__header">
          <h2 className="search__title">Search</h2>

          <div className="search-block">
            <input
              className="search-block__field field field--search"
              type="text"
              placeholder="Search"
              value={value}
              onChange={({ target }) => {
                setValue(target.value.toLowerCase());
              }}
            />
            <button className="search-block__clean" onClick={clearInput}>
              x
            </button>
          </div>
        </header>
        <div className="search__inner">{content}</div>
      </div>
    </CSSTransition>
  );
}

export default SearchBlock;
