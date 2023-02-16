import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../context/user-context';
import { getUserByUsername } from '../firebase/services';
import * as ROUTES from '../constants/routes';
import { IUserProfile } from '../types/types';
import { User } from 'firebase/auth';
import Menu from '../components/menu/menu';
import UserProfile from '../components/userProfile';
import './profile.scss';


export default function Profile() {
  const navigate = useNavigate();
  const { username } = useParams(); // Get username from link /p/:username
  const loggedUser = useContext(UserContext).user;

  const [user, setUser] = useState<IUserProfile | null>(null);
  const [logUserState, setLogUserState] = useState<User | null>(null);

  useEffect(() => {
    document.title = `Instagram - ${username}`;
  }, [username]);

  useEffect(() => {
    if (loggedUser === null) {
      navigate(ROUTES.LOGIN);
    }
    setLogUserState(loggedUser)
  }, [loggedUser]);

  useEffect(() => {
    async function checkUserExists() {
      const currUser = await getUserByUsername(
        username?.toLowerCase() as string
      );

      if (currUser?.userId) {
        setUser(currUser);
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, navigate]);

  return (
    <main className="main-page">
      <Menu isMainPage={false} />
      <UserProfile user={user} />
    </main>
  );
}
