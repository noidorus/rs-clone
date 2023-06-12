import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import { IPhotoDoc } from '../types/types';
import Menu from '../components/menu/menu';
import UserProfile from '../components/userProfile';
import './profile.scss';

import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { fetchUser } from '../redux/slices/profileSlice';
import { useModal } from '../components/providers/ModalProvider';

export default function Profile() {
  const navigate = useNavigate();
  const { username } = useParams(); // Get username from link /p/:username

  const user = useAppSelector(({ profile }) => profile.user);
  const loggedUser = useAppSelector(({ user }) => user.loggedUser);
  const dispatch = useAppDispatch();
  const { Modal } = useModal();

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
    <main className="main-page">
      <Menu page="profile" />
      {user && <UserProfile user={user} />}
      {Modal}
    </main>
  );
}
