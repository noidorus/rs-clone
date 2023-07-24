import React from 'react';

import { PacmanLoader, RingLoader } from 'react-spinners';

interface SpinnerProps {
  loading: boolean;
  shadow?: boolean;
  size?: number;
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

const RingSpinner = ({ loading, size = 100 }: SpinnerProps) => {
  return (
    <>
      {loading && (
        <>
          <div className="spinner">
            <RingLoader color="blue" size={size} />
          </div>
        </>
      )}
    </>
  );
};

export { PacmanSpinner, RingSpinner };
