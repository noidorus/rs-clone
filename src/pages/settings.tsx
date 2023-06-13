import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../constants/routes';
import Menu from '../components/menu/menu';
import './main.scss';

import { useAppSelector } from '../hooks/redux.hook';
import { PacmanLoader } from 'react-spinners';
import { ProfileSettings } from '../components/pagesView/settings';
import PacmanSpinner from '../components/spinner/spinner';

export default function Profile() {
  const navigate = useNavigate();

  const { loggedUser } = useAppSelector(({ userInfo }) => userInfo);

  useEffect(() => {
    document.title = `Instagram - settings`;
  }, []);

  useEffect(() => {
    if (loggedUser === null) {
      navigate(ROUTES.SIGN_IN);
    }
  }, [loggedUser]);

  if (!loggedUser) {
    return <PacmanSpinner loading={true} />;
  }

  return (
    <main className="main main-settings">
      <Menu page="settings" loggedUser={loggedUser} />

      <ProfileSettings user={loggedUser} />
    </main>
  );
}
