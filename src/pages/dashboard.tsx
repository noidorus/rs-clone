import React, { useEffect, useState } from 'react';

import Menu from '../components/menu/menu';
import * as ROUTES from '../constants/routes';
import { useNavigate } from 'react-router-dom';
import { IPhotoDoc } from '../types/types';
import MainPage from '../components/dashboard';
import PhotosContext from '../context/photos-context';

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
      navigate(ROUTES.LOGIN);
    }
  }, [loggedUser]);

  return (
    <PhotosContext.Provider value={{ photos, setPhotos }}>
      <main className="main-page">
        <Menu isMainPage={true} />
        {loggedUser && <MainPage user={loggedUser} />}
      </main>
    </PhotosContext.Provider>
  );
}
