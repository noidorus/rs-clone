import React from 'react';

import './index.scss';

interface ValidationErrorProps {
  message: string;
}

const FormError = ({ message }: ValidationErrorProps) => {
  return (
    <p className="form__error" role="alert">
      {message}
    </p>
  );
};

export default FormError;
