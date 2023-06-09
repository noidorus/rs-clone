import React, { useEffect, useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

import Menu from '../components/menu/menu';
import { ROUTES } from '../constants/routes';

import { IPhotoDoc } from '../types/types';
import MainPage from '../components/dashboard';
import PhotosContext from '../context/photos-context';

import { useAppSelector } from '../hooks/redux.hook';
import { useModal } from '../components/providers/ModalProvider';

import './dashboard.scss';

const Dashboard = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<IPhotoDoc[]>([]);
  const loggedUser = useAppSelector(({ auth }) => auth.loggedUser);

  const { Modal } = useModal();

  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  useEffect(() => {
    if (loggedUser === null) {
      navigate(ROUTES.SIGN_IN);
    }
  }, [loggedUser]);

  if (!loggedUser) {
    return (
      <div className="spinner">
        <PacmanLoader color="blue" size={45} />
      </div>
    );
  }

  return (
    <PhotosContext.Provider value={{ photos, setPhotos }}>
      <>
        <main className="main-page">
          <Menu isMainPage={true} />
          <MainPage user={loggedUser} />
        </main>

        {Modal}
      </>
    </PhotosContext.Provider>
  );
};

export default Dashboard;
