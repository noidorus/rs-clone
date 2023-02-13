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
    setSearchBlock(!searchBlock)
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.DASHBOARD}>Home</Link>
        </li>
        <li>          
          <button type="button" onClick={openSearchBlock}>
            Search
          </button></li>
        <li>
          {user ? (
            // <Link to={`/p/szyrwel`}>Profile</Link>
            <Link to={`/p/${user.displayName}`}>Profile</Link>
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
          {searchBlock ? <SearchBlock/> : <></>}
        </div>
      </ul>
    </nav>
  );
}
