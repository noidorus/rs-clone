import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import FirebaseContext from '../../context/firebase-context';
import UserContext from '../../context/user-context';
import LoadPhotoButton from '../loadPhotoButton/loadPhotoButton';
import * as ROUTES from '../../constants/routes';

import './menu.scss';
import { FirebaseApp } from '@firebase/app-types';
import SearchBlock from '../searhBlock/searchBlock';

export default function Menu() {
  const firebase = useContext(FirebaseContext)?.firebase as FirebaseApp;

  const [searchBlock, setSearchBlock] = useState(false);
  const user = useContext(UserContext);

  function openSearchBlock() {
    setSearchBlock(!searchBlock);
  }

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
      <ul className='main-nav__inner'>
        <li className='main-nav__item'>
          <Link className='main-nav__link main-nav__link--home' to={ROUTES.DASHBOARD}>
            <span className='main-nav__text'>Home</span>
          </Link>
        </li>
        <li className='main-nav__item main-nav__item--search'>
          <a className={
            searchBlock ? 
              'main-nav__link main-nav__link--search main-nav__link--active' 
              : 'main-nav__link main-nav__link--search'
            }
            onClick={openSearchBlock}>
            <span className='main-nav__text'>Search</span>
          </a>
        </li>
        <li className="main-nav__item">
          <a className="main-nav__link main-nav__link--explore" href="#">
          <span className='main-nav__text'>Explore</span>
          </a>
        </li>
        <li className="main-nav__item">
          <a className="main-nav__link main-nav__link--reels" href="#">
          <span className='main-nav__text'>Reels</span>
          </a>
        </li>
        <li className="main-nav__item">
          <a className="main-nav__link main-nav__link--messages" href="#">
            <span className='main-nav__text'>Messages</span>
          </a>
        </li>
        <li className="main-nav__item">
          <a className="main-nav__link main-nav__link--notifications" href="#">
            <span className='main-nav__text'>Notifications</span>
          </a>
        </li>
        <li className="main-nav__item">
          {/* подправить стили внутри */}
          <LoadPhotoButton />
        </li>
        <li className="main-nav__item">
          {user ? (
            <Link
              className="main-nav__link main-nav__link--profile"
              to={`/${user.displayName}`}
            >
              <span className='main-nav__text'>Profile</span>
            </Link>
          ) : null}
        </li>
        <li className="main-nav__item main-nav__item--logout">
          <a className="main-nav__link main-nav__link--signout" type="button" onClick={() => signOut(getAuth(firebase))}>
          <span className='main-nav__text'>Sign Out</span>
          </a>
        </li>
      </ul>
      {searchBlock && <SearchBlock />}
    </nav>
  );
}
