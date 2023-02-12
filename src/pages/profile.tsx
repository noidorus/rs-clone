import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../context/user-context';
import { getUserByUsername } from '../firebase/services';
import * as ROUTES from '../constants/routes';
import { IUserProfile } from '../types/types';

import Menu from '../components/menu/menu';
import UserProfile from '../components/userProfile/user-profile';



export default function Profile() {
  const navigate = useNavigate();
  const { username } = useParams(); // Get username from link /p/:username
  const authUser = useContext(UserContext);

  const [user, setUser] = useState<IUserProfile | null>(null);

  useEffect(() => {
    if (authUser === null) {
      navigate(ROUTES.LOGIN);
    }

    async function checkUserExist() {
      const [user] = await getUserByUsername(username as string);
      if (user?.userId) {
        setUser(user);
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }

    checkUserExist();
  });

  return (
    <div>
      <Menu />
      <UserProfile user={user} />
    </div>
  );
}
