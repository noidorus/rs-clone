import React, { useContext, useState, Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import FirebaseContext from '../../context/firebase-context';
import UserContext from '../../context/user-context';
import LoadPhotoButton from '../loadPhotoButton/loadPhotoButton';
import * as ROUTES from '../../constants/routes';

import './menu.scss';
import { FirebaseApp } from '@firebase/app-types';
import SearchBlock from '../searhBlock/searchBlock';
import { IPhotoDoc } from '../../types/types';

interface MenuProps {
  isMainPage: boolean;
  photos: IPhotoDoc[];
  setPhotos: Dispatch<SetStateAction<IPhotoDoc[]>>;
  profileUsername?: string;
}

export default function Menu({
  isMainPage,
  photos,
  setPhotos,
  profileUsername,
}: MenuProps) {
  const firebase = useContext(FirebaseContext)?.firebase as FirebaseApp;
  const [searchBlock, setSearchBlock] = useState(false);
  const { user } = useContext(UserContext);

  function openSearchBlock() {
    setSearchBlock(true);
  }
  
  function closeSearchBlock() {
    setSearchBlock(false);
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
      <ul className="main-nav__inner">
        <li className="main-nav__item">
          <Link
            className={
              isMainPage && !searchBlock
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
          <a className="main-nav__link main-nav__link--notifications" href="#">
            <span className="main-nav__text">Notifications</span>
          </a>
        </li>
        <li className="main-nav__item">
          {/* подправить стили внутри */}
          <LoadPhotoButton
            isMainPage={isMainPage}
            photos={photos}
            setPhotos={setPhotos}
            profileUsername={profileUsername}
          />
        </li>
        <li className="main-nav__item">
          {user ? (
            <Link
              className={
                isMainPage
                  ? 'main-nav__link main-nav__link--profile'
                  : 'main-nav__link main-nav__link--profile main-nav__link--active'
              }
              to={`/${user.displayName}`}
            >
              <span className="main-nav__text">Profile</span>
            </Link>
          ) : null}
        </li>
        <li className="main-nav__item main-nav__item--logout">
          <a
            className="main-nav__link main-nav__link--signout"
            type="button"
            onClick={() => signOut(getAuth(firebase))}
          >
            <span className="main-nav__text">Sign Out</span>
          </a>
        </li>
      </ul>
      {searchBlock && <SearchBlock 
        closeSearchBlock={closeSearchBlock}
      />}
    </nav>
  );
}
