import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../components/pagesView/authLayout/authLayout';
import SignUpForm from '../components/forms/authForms/SignUpForm';
import { PacmanSpinner } from '../components/spinner/spinner';
import { ROUTES } from '../constants/routes';
import { useAppSelector } from '../hooks/redux.hook';

const SignUpPage = () => {
  const { loggedUser } = useAppSelector(({ userCenter }) => userCenter);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [loggedUser]);

  if (loggedUser) {
    return <PacmanSpinner loading={true} />;
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
