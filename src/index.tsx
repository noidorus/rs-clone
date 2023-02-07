import './index';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
);

root.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>
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
// lib (firebase),
// services (firebase fn),
// styles (tailwind's folder (app/tailwind))
