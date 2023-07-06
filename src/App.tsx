import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import authListener from './hooks/authListener';
import ThemeProvider from './components/providers/ThemeProvider';
import { ModalProvider } from './components/providers/ModalProvider';
import { PacmanSpinner } from './components/spinner/spinner';

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
          <Suspense fallback={<PacmanSpinner loading={true} />}>
            <Routes>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} />
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
