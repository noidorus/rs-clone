import React from 'react';

export interface ValidationErrorProps {
  message: string;
}

const FormError = ({ message }: ValidationErrorProps) => {
  return (
    <p className="auth-form__error" role="alert">
      {message}
    </p>
  );
};

export default FormError;
