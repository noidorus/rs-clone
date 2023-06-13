import React from 'react';

import { PacmanLoader } from 'react-spinners';

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
          <div className="spinner">
            <PacmanLoader color="blue" size={45} />
          </div>
          {shadow && <div className="shadow" />}
        </>
      )}
    </>
  );
};

export default PacmanSpinner;
