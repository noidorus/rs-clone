import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import Menu from '../components/menu/menu';
import UserProfile from '../components/userProfile';
import './profile.scss';

import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { fetchProfile } from '../redux/slices/userCenter';
import { useModal } from '../components/providers/ModalProvider';
import { PacmanLoader } from 'react-spinners';
import { ProfileSettings } from '../components/settings';

export default function Profile() {
  const navigate = useNavigate();

  const { loggedUser } = useAppSelector(({ userCenter }) => userCenter);
  const { userId } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();
  const { Modal } = useModal();

  useEffect(() => {
    document.title = `Instagram - settings`;
  }, []);

  useEffect(() => {
    if (userId === null) {
      navigate(ROUTES.LOGIN);
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
    <main className="main-page">
      <Menu page="profile" loggedUser={loggedUser} />
      <ProfileSettings user={loggedUser} />
      {/* <UserProfile user={profile} /> */}
      {Modal}
    </main>
  );
}
