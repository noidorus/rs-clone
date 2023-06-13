import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '../constants/routes';
import Menu from '../components/menu/menu';
import UserProfile from '../components/pagesView/userProfile';
import './main.scss';

import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { fetchProfile } from '../redux/slices/profileSlice';
import { useModal } from '../components/providers/ModalProvider';
import PacmanSpinner from '../components/spinner/spinner';

export default function Profile() {
  const navigate = useNavigate();
  const { username } = useParams(); // Get username from link /:username

  const { user } = useAppSelector(({ profile }) => profile);
  const { loggedUser } = useAppSelector(({ userInfo }) => userInfo);
  const dispatch = useAppDispatch();
  const { Modal } = useModal();

  useEffect(() => {
    document.title = `Instagram - ${username}`;
    dispatch(fetchProfile(username?.toLowerCase() as string));
  }, [username]);

  useEffect(() => {
    if (loggedUser === null) {
      navigate(ROUTES.SIGN_IN);
    }
  }, [loggedUser]);

  useEffect(() => {
    if (user === undefined) navigate(ROUTES.NOT_FOUND);
  }, [user]);

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
