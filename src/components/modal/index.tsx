import React, { MouseEvent } from 'react';

interface IProps {
  children: JSX.Element;
}

const Modal = ({ children }: IProps) => {
  const handleCloseModal = () => {};

  return (
    <div className="modal" aria-label="modal" onClick={handleCloseModal}>
      {children}
    </div>
  );
};

export { Modal };
