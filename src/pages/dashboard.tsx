import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Menu from '../components/menu/menu';
import { ROUTES } from '../constants/routes';
import MainPage from '../components/pagesView/dashboard';

import { useAppSelector } from '../hooks/redux.hook';
import { useModal } from '../components/providers/ModalProvider';
import { PacmanSpinner } from '../components/spinner/spinner';

import './main.scss';

const Dashboard = () => {
  const navigate = useNavigate();
  const { loggedUser } = useAppSelector(({ userCenter }) => userCenter);

  const { Modal, closeModal } = useModal();

  useEffect(() => {
    document.title = 'Instagram';

    if (loggedUser === null) {
      navigate(ROUTES.SIGN_IN);
    }

    return () => {
      closeModal();
    };
  }, [loggedUser]);

  if (!loggedUser) {
    return <PacmanSpinner loading={true} />;
  }

  return (
    <main className="main">
      <Menu loggedUser={loggedUser} page="main" />
      <MainPage user={loggedUser} />
      {Modal}
    </main>
  );
};

export default Dashboard;
