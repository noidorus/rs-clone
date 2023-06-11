import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

import './menu.scss';
import SearchBlock from '../searhBlock/searchBlock';
import { ThemeContext, Themes } from '../providers/ThemeProvider';
import Toggle from '../toggle/toggle';

import { useAppSelector } from '../../hooks/redux.hook';
import { logOut } from '../../firebase/services';
import { IUserProfile } from '../../types/types';
import { useModal } from '../providers/ModalProvider';
import { UploadPhotoForm } from '../modals/uploadPhotoModal/UploadPhotoForm';

interface MenuProps {
  page: 'main' | 'profile';
}

export default function Menu({ page }: MenuProps) {
  const [searchBlock, setSearchBlock] = useState(false);
  const loggedUser = useAppSelector(
    ({ user }) => user.loggedUser
  ) as IUserProfile;
  const { setModal } = useModal();

  function openSearchBlock(): void {
    setSearchBlock(true);
  }

  function closeSearchBlock(): void {
    setSearchBlock(false);
  }

  const handleSignOut = () => {
    logOut();
  };

  const openModal = (type: 'photo') => {
    if (type === 'photo') {
      setModal(<UploadPhotoForm page={page} />);
    }
  };

  return (
    <nav className={searchBlock ? 'main-nav main-nav--compact' : 'main-nav'}>
      <Link className="main-nav__logo" to={ROUTES.DASHBOARD}>
        <img
          className="main-nav__image"
          src="./images/logo.png"
          alt="Instagram logo"
          width="103"
          height="29"
        />
      </Link>
      <ul className="main-nav__inner">
        <li className="main-nav__item">
          <Link
            className={
              page === 'main' && !searchBlock
                ? 'main-nav__link main-nav__link--home main-nav__link--active'
                : 'main-nav__link main-nav__link--home'
            }
            to={ROUTES.DASHBOARD}
          >
            <span className="main-nav__text">Home</span>
          </Link>
        </li>
        <li className="main-nav__item main-nav__item--search">
          <a
            className={
              searchBlock
                ? 'main-nav__link main-nav__link--search main-nav__link--active'
                : 'main-nav__link main-nav__link--search'
            }
            onClick={openSearchBlock}
          >
            <span className="main-nav__text">Search</span>
          </a>
        </li>
        <li className="main-nav__item">
          <a
            className={'main-nav__link main-nav__link--create'}
            onClick={() => openModal('photo')}
          >
            <span className="main-nav__text">Create</span>
          </a>
        </li>
        <li className="main-nav__item">
          <Link
            className={
              page === 'main'
                ? 'main-nav__link main-nav__link--profile'
                : 'main-nav__link main-nav__link--profile main-nav__link--active'
            }
            to={`/${loggedUser.username}`}
          >
            <span className="main-nav__text">Profile</span>
          </Link>
        </li>
        <li className="main-nav__item main-nav__item--theme">
          <ThemeContext.Consumer>
            {({ theme, setTheme }) => (
              <Toggle
                onChange={() => {
                  if (theme === Themes.light) setTheme(Themes.dark);
                  if (theme === Themes.dark) setTheme(Themes.light);
                }}
                value={theme === Themes.dark}
              />
            )}
          </ThemeContext.Consumer>
        </li>
        <li className="main-nav__item">
          <a
            className="main-nav__link main-nav__link--signout"
            type="button"
            onClick={handleSignOut}
          >
            <span className="main-nav__text">Sign Out</span>
          </a>
        </li>
      </ul>
      {searchBlock && <SearchBlock closeSearchBlock={closeSearchBlock} />}
    </nav>
  );
}
