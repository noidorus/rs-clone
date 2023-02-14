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

  const[searchBlock, setSearchBlock] = useState(false)
  const user = useContext(UserContext);

    function openSearchBlock() {
      setSearchBlock(!searchBlock);
  }

  return (
    <nav className='main-nav'>
      <Link className='main-nav__logo' to={ROUTES.DASHBOARD}>
        <img className='main-nav__image' src='./images/logo.png' alt='Instagram logo' width='103' height='29' />
      </Link>
      <ul className='main-nav__inner'>
        <li className='main-nav__item'>
          <Link className='main-nav__link main-nav__link--active main-nav__link--home' to={ROUTES.DASHBOARD}>
            Home
          </Link>
        </li>
        <li className='main-nav__item'>
          <a className='main-nav__link main-nav__link--search' href='#'
            onClick={openSearchBlock}>
            Search
          </a>
        </li>
        <li className='main-nav__item'>
          <a className='main-nav__link main-nav__link--explore' href='#'>
            Explore
          </a>
        </li>
        <li className='main-nav__item'>
          <a className='main-nav__link main-nav__link--reels' href='#'>
            Reels
          </a>
        </li>
        <li className='main-nav__item'>
          <a className='main-nav__link main-nav__link--messages' href='#'>
            Messages
          </a>
        </li>
        <li className='main-nav__item'>
          <a className='main-nav__link main-nav__link--notifications' href='#'>
            Notifications
          </a>
        </li>
        <li className='main-nav__item'>
          <a className='main-nav__link main-nav__link--create' href='#'>
            Create
          </a>
        </li>
        <li>
          {user ? (
            // <Link to={`/p/szyrwel`}>Profile</Link>
            <Link className='main-nav__link main-nav__link--profile' to={`/p/${user.displayName}`}>Profile</Link>
          ) : null}
        </li>
        <li>
          <LoadPhotoButton />
        </li>
        <li>
          <button type="button" onClick={() => signOut(getAuth(firebase))}>
            Sign Out
          </button>
        </li>
        <div>
          {searchBlock && <SearchBlock/>}
        </div>
      </ul>
    </nav>
  );
}
