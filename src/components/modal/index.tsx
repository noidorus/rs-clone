import React, { MouseEvent } from 'react';

import './index.scss';

interface IProps {
  children: JSX.Element;
}

const Modal = ({ children }: IProps) => {
  const handleCloseModal = (e: MouseEvent) => {};

  return (
    <div className="modal" aria-label="modal" onClick={handleCloseModal}>
      {children}
    </div>
  );
};

export { Modal };
