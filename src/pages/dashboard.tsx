import React, { useEffect, useState } from 'react';

import Menu from '../components/menu/menu';
import { ROUTES } from '../constants/routes';
import { useNavigate } from 'react-router-dom';
import { IPhotoDoc } from '../types/types';
import MainPage from '../components/dashboard';
import PhotosContext from '../context/photos-context';

import { PacmanLoader } from 'react-spinners';

import './dashboard.scss';
import { useAppSelector } from '../hooks/redux.hook';

export default function Dashboard() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<IPhotoDoc[]>([]);
  const loggedUser = useAppSelector(({ auth }) => auth.loggedUser);

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
      <main className="main-page">
        <Menu isMainPage={true} />
        <MainPage user={loggedUser} />
      </main>
    </PhotosContext.Provider>
  );
}
