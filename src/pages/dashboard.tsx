import React, { useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

import Menu from '../components/menu/menu';
import { ROUTES } from '../constants/routes';
import MainPage from '../components/pagesView/dashboard';

import { useAppSelector } from '../hooks/redux.hook';
import { useModal } from '../components/providers/ModalProvider';

import './main.scss';

const Dashboard = () => {
  const navigate = useNavigate();
  const { loggedUser } = useAppSelector(({ userCenter }) => userCenter);
  const { userId } = useAppSelector(({ auth }) => auth);

  const { Modal } = useModal();

  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  useEffect(() => {
    if (userId === null) {
      navigate(ROUTES.SIGN_IN);
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
    <main className="main">
      <Menu loggedUser={loggedUser} page="main" />
      <MainPage user={loggedUser} />
      {Modal}
    </main>
  );
};

export default Dashboard;
