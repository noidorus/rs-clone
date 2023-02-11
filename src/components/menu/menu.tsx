import React, { useContext, Context } from 'react';
import { Link, redirect } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import FirebaseContext from '../../context/firebase-context';
import UserContext from '../../context/user-context';
import LoadPhotoButton from '../loadPhotoButton/loadPhotoButton';
import * as ROUTES from '../../constants/routes';

import './menu.scss';
import { FirebaseApp } from '@firebase/app-types';

export default function Menu() {
  const firebase = useContext(FirebaseContext)?.firebase as FirebaseApp;

  return (
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.DASHBOARD}>Home</Link>
        </li>
        <li>Search</li>
        {/* <li><Link to={ROUTES.PROFILE}>Profile</Link></li> */}
        <li>
          <button type="button" onClick={() => signOut(getAuth(firebase))}>
            Sign Out
          </button>
        </li>
        <li>
          <LoadPhotoButton />
        </li>
      </ul>
    </nav>
  );
}
