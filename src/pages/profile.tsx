import React, { useContext, useEffect } from 'react';
import UserContext from '../context/user-context';
import Menu from '../components/menu/menu';
import * as ROUTES from '../constants/routes';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext === null) {
      navigate(ROUTES.LOGIN);
    }
  });
  
  return (
    <div>
      <Menu />
    </div>
  );
}
