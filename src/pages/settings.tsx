import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import Menu from '../components/menu/menu';
import './main.scss';

import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { PacmanLoader } from 'react-spinners';
import { ProfileSettings } from '../components/pagesView/settings';

export default function Profile() {
  const navigate = useNavigate();

  const { loggedUser } = useAppSelector(({ userCenter }) => userCenter);
  const { userId } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = `Instagram - settings`;
  }, []);

  useEffect(() => {
    if (userId === null) {
      navigate(ROUTES.LOGIN);
    }
  }, [userId]);

  if (!loggedUser || !userId) {
    return (
      <div className="spinner">
        <PacmanLoader color="blue" size={45} />
      </div>
    );
  }

  return (
    <main className="main main-settings">
      <Menu page="profile" loggedUser={loggedUser} />

      <ProfileSettings user={loggedUser} />
    </main>
  );
}
