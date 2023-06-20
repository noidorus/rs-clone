import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { updateUserInfo } from '../../../redux/slices/userCenter';
import FormError from '../formError';
import { updateInfoResolver, UpdateInfoSchemaType } from '../yupSchemas';

import './index.scss';

const UpdateInfoForm = () => {
  const { loggedUser } = useAppSelector(({ userCenter }) => userCenter);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateInfoSchemaType>({ resolver: updateInfoResolver });
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(async (data) => {
    if (loggedUser) {
      dispatch(updateUserInfo({ ...data, docId: loggedUser.docId }));
    }
  });

  return (
    <form className="update-info__form" onSubmit={onSubmit}>
      <h3 className="form-title">Update info</h3>
      <label className="field-wrapper">
        Username
        <input
          className="field"
          type="text"
          {...register('username')}
          defaultValue={loggedUser?.username}
        />
        {errors.username?.message && (
          <FormError message={errors.username?.message} />
        )}
      </label>

      <label className="field-wrapper">
        Full Name
        <input
          {...register('fullName')}
          className="field"
          type="text"
          defaultValue={loggedUser?.fullName}
        />
      </label>
      <button className="button button--primary" type="submit">
        Edit
      </button>
    </form>
  );
};

export default UpdateInfoForm;
