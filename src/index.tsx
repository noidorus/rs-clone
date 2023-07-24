import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import FirebaseContext from './context/firebase-context';
import { firebase, db, auth } from './firebase/lib';
import 'react-loading-skeleton/dist/skeleton.css';

import './main.scss';
import { setupStore } from './redux/setupStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
);

const storageData = localStorage.getItem('auth-user') || 'null';
const preloadedState = {
  userCenter: {
    loggedUser: JSON.parse(storageData),
    authError: null,
    loading: false,
    userProfile: null,
  },
};

const store = setupStore(preloadedState);

root.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={{ firebase, db, auth }}>
      <App />
    </FirebaseContext.Provider>
  </Provider>
);

// client side render app: react
// database (Firebase)
// react-loading-skeleton
// tailwind

// Folder structure
// src
// components,
// constants,
// helpers,
// hooks,
// pages,
// firebase (lib, services, storage),
