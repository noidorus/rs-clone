import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';

import AuthLayout from '../components/authLayout/authLayout';
import SignUpForm from '../components/forms/SignUpForm';
import { ROUTES } from '../constants/routes';
import { useAppSelector } from '../hooks/redux.hook';

const SignUpPage = () => {
  const { loggedUser } = useAppSelector(({ auth }) => auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [loggedUser]);

  if (loggedUser) {
    <div className="spinner">
      <PacmanLoader color="blue" size={45} />
    </div>;
  }
  const layoutProps = {
    route: ROUTES.SIGN_IN,
    text: `Have an account? `,
    linkText: 'Sign In',
  };

  return (
    <AuthLayout {...layoutProps}>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
