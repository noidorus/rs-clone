import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '../constants/routes';
import Menu from '../components/menu/menu';
import UserProfile from '../components/pagesView/userProfile';
import './main.scss';

import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { fetchProfile } from '../redux/slices/userCenter';
import { useModal } from '../components/providers/ModalProvider';
import PacmanSpinner from '../components/spinner/spinner';

export default function Profile() {
  const navigate = useNavigate();
  const { username } = useParams(); // Get username from link /:username

  const { userProfile, loggedUser } = useAppSelector(
    ({ userCenter }) => userCenter
  );
  const dispatch = useAppDispatch();
  const { Modal, closeModal } = useModal();

  useEffect(() => {
    document.title = `Instagram - ${username}`;
    dispatch(fetchProfile(username?.toLowerCase() as string));
    console.log('render!');

    return () => {
      closeModal();
    };
  }, [username]);

  useEffect(() => {
    if (loggedUser === null) {
      navigate(ROUTES.SIGN_IN);
    }
  }, [loggedUser]);

  useEffect(() => {
    if (userProfile === undefined) navigate(ROUTES.NOT_FOUND);
  }, [userProfile]);

  if (!loggedUser) {
    return <PacmanSpinner loading={true} />;
  }

  return (
    <main className="main">
      {<Menu page="profile" loggedUser={loggedUser} />}

      <UserProfile />
      {Modal}
    </main>
  );
}
