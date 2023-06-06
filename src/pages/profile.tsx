import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import { IPhotoDoc } from '../types/types';
import Menu from '../components/menu/menu';
import UserProfile from '../components/userProfile';
import './profile.scss';
import PhotosContext from '../context/photos-context';

import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { fetchUser } from '../redux/slices/profileSlice';

export default function Profile() {
  const navigate = useNavigate();
  const { username } = useParams(); // Get username from link /p/:username
  const [photos, setPhotos] = useState<IPhotoDoc[]>([]);

  const user = useAppSelector(({ profile }) => profile.user);
  const loggedUser = useAppSelector(({ auth }) => auth.loggedUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = `Instagram - ${username}`;
  }, [username]);

  useEffect(() => {
    if (loggedUser === null) {
      navigate(ROUTES.LOGIN);
    }
  }, [loggedUser]);

  useEffect(() => {
    dispatch(fetchUser(username?.toLowerCase() as string));
  }, [username]);

  useEffect(() => {
    if (user === undefined) navigate(ROUTES.NOT_FOUND);
  }, [user]);

  return (
    <PhotosContext.Provider value={{ photos, setPhotos }}>
      <main className="main-page">
        <Menu isMainPage={false} profileUsername={username} />
        {user && <UserProfile user={user} />}
      </main>
    </PhotosContext.Provider>
  );
}
