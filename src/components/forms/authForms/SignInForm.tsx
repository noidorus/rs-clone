import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { signInWithEmail } from '../../../redux/slices/auth';
import FormError from '../formError';

import './styles.scss';
import { SignInSchemaType, signInResolver } from '../yupSchemas';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({ resolver: signInResolver });
  const dispatch = useAppDispatch();
  const { authError, loading } = useAppSelector(({ auth }) => auth);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    dispatch(signInWithEmail({ email, password })).then(() => {
      navigate(ROUTES.DASHBOARD);
    });
  });

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {authError && <FormError message={authError} />}

      <div className="auth-form__item">
        <input
          {...register('email')}
          className="field"
          type="text"
          aria-label="Enter your email address"
          placeholder="Email address"
        />
        {errors.email?.message && <FormError message={errors.email?.message} />}
      </div>

      <div className="auth-form__item">
        <input
          {...register('password')}
          className="field"
          type="password"
          aria-label="Enter your password"
          placeholder="Password"
        />
        {errors.password?.message && (
          <FormError message={errors.password?.message} />
        )}
      </div>

      <button className="button button--primary" type="submit">
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
