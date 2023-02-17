import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user-context';
import Menu from '../components/menu/menu';
import * as ROUTES from '../constants/routes';
import { useNavigate } from 'react-router-dom';
import { IPhotoDoc } from '../types/types';
import MainPage from '../components/dashboard';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [photos, setPhotos] = useState<IPhotoDoc[]>([]);

  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  useEffect(() => {
    if (user === null) {
      navigate(ROUTES.LOGIN);
    }
  }, [user]);

  return (
    <main className="main-page">
      <Menu isMainPage={true} photos={photos} setPhotos={setPhotos} />
      {user ? <MainPage photos={photos} setPhotos={setPhotos} user={user} /> : null}
    </main>
  );
}
