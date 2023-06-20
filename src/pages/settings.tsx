import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../constants/routes';

import { useAppSelector } from '../hooks/redux.hook';
import Menu from '../components/menu/menu';
import { ProfileSettings } from '../components/pagesView/settings';
import PacmanSpinner from '../components/spinner/spinner';
import { useModal } from '../components/providers/ModalProvider';

import './main.scss';

export default function Profile() {
  const { loggedUser } = useAppSelector(({ userCenter }) => userCenter);
  const navigate = useNavigate();
  const { Modal, closeModal } = useModal();

  useEffect(() => {
    document.title = `Instagram - settings`;

    return () => {
      closeModal();
    };
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
      {Modal}
    </main>
  );
}
