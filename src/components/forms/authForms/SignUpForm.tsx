import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';

import { signUpResolver, SignUpSchemaType } from '../yupSchemas';
import { registerWithEmail } from '../../../redux/slices/authSlice';
import FormError from '../formError';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: signUpResolver });
  const dispatch = useAppDispatch();
  const { authError, authLoading } = useAppSelector(({ auth }) => auth);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const newData = {
      ...data,
      username: data.username.toLowerCase(),
      email: data.email.toLocaleLowerCase(),
    };

    dispatch(registerWithEmail(newData)).then(() => {
      navigate(ROUTES.DASHBOARD);
    });
  });

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {authError && <FormError message={authError} />}

      <div className="auth-form__item">
        <input
          {...register('username')}
          className="field"
          type="text"
          aria-label="Enter your username"
          placeholder="Username"
        />
        {errors.username?.message && (
          <FormError message={errors.username?.message} />
        )}
      </div>

      <div className="auth-form__item">
        <input
          {...register('fullName')}
          className="field"
          type="text"
          aria-label="Enter your full name"
          placeholder="Full name"
        />
        {errors.fullName?.message && (
          <FormError message={errors.fullName?.message} />
        )}
      </div>

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

      <p className="auth-form__text">By signing up, you agree to our Terms.</p>

      <button className="button button--primary" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
