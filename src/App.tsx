import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import authListener from './hooks/auth-listener';
import ThemeProvider from './components/providers/ThemeProvider';
import { ModalProvider } from './components/providers/ModalProvider';

const NotFound = lazy(() => import('./pages/page-not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const SignIn = lazy(() => import('./pages/signIn'));
const SignUp = lazy(() => import('./pages/signUp'));
const Settings = lazy(() => import('./pages/settings'));

function App() {
  authListener();

  return (
    <ThemeProvider>
      <ModalProvider>
        <BrowserRouter>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} />
              <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
              <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
              <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
              <Route path={ROUTES.SETTINGS} element={<Settings />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
