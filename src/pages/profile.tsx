import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import Menu from '../components/menu/menu';
import UserProfile from '../components/pagesView/userProfile';
import './main.scss';

import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { fetchProfile } from '../redux/slices/userCenter';
import { useModal } from '../components/providers/ModalProvider';
import { PacmanLoader } from 'react-spinners';

export default function Profile() {
  const navigate = useNavigate();
  const { username } = useParams(); // Get username from link /:username

  const { profile, loggedUser } = useAppSelector(
    ({ userCenter }) => userCenter
  );
  const { userId } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();
  const { Modal } = useModal();

  useEffect(() => {
    document.title = `Instagram - ${username}`;
    dispatch(
      fetchProfile({
        key: 'username',
        value: username?.toLowerCase() as string,
      })
    );
  }, [username]);

  useEffect(() => {
    if (userId === null) {
      navigate(ROUTES.LOGIN);
    }
  }, [userId]);

  useEffect(() => {
    if (profile === undefined) navigate(ROUTES.NOT_FOUND);
  }, [profile]);

  if (!loggedUser || !profile || !username) {
    return (
      <div className="spinner">
        <PacmanLoader color="blue" size={45} />
      </div>
    );
  }

  return (
    <main className="main">
      <Menu page="profile" loggedUser={loggedUser} />
      <UserProfile user={profile} />
      {Modal}
    </main>
  );
}
