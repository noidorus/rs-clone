import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/pagesView/authLayout/authLayout';
import SignInForm from '../components/forms/authForms/SignInForm';
import PacmanSpinner from '../components/spinner/spinner';
import { ROUTES } from '../constants/routes';
import { useAppSelector } from '../hooks/redux.hook';

const SignInPage = () => {
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
    route: ROUTES.SIGN_UP,
    text: `Don't have an account? `,
    linkText: 'Sign Up',
  };

  return (
    <AuthLayout {...layoutProps}>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignInPage;
