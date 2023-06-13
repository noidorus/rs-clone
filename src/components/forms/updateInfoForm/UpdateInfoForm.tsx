import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { updateUserInfo } from '../../../redux/slices/userCenter';
import { useModal } from '../../providers/ModalProvider';
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
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const onSubmit = handleSubmit(async (data) => {
    if (loggedUser) {
      dispatch(updateUserInfo({ ...data, docId: loggedUser.docId })).then(
        () => {
          closeModal();
          navigate(`/${data.username}`);
        }
      );
    }
  });

  return (
    <form className="update-info__form" onSubmit={onSubmit}>
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
