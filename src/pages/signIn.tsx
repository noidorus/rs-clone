import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import AuthLayout from '../components/authLayout/authLayout';
import SignInForm from '../components/forms/authForms/SignInForm';
import { ROUTES } from '../constants/routes';
import { useAppSelector } from '../hooks/redux.hook';

const SignInPage = () => {
  const { userId } = useAppSelector(({ auth }) => auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [userId]);

  if (userId) {
    return (
      <div className="spinner">
        <PacmanLoader color="blue" size={45} />
      </div>
    );
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
