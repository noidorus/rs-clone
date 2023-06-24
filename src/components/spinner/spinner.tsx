import React from 'react';

import { PacmanLoader, RingLoader } from 'react-spinners';

interface SpinnerProps {
  loading: boolean;
  shadow?: boolean;
}

import './index.scss';

const PacmanSpinner = ({ loading, shadow = true }: SpinnerProps) => {
  return (
    <>
      {loading && (
        <>
          <div className="spinner-absolute">
            <PacmanLoader color="blue" size={45} />
          </div>
          {shadow && <div className="shadow" />}
        </>
      )}
    </>
  );
};

const RingSpinner = ({ loading }: SpinnerProps) => {
  return (
    <>
      {loading && (
        <>
          <div className="spinner">
            <RingLoader color="blue" size={100} />
          </div>
        </>
      )}
    </>
  );
};

export { PacmanSpinner, RingSpinner };
