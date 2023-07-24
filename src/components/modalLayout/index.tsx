import React, { MouseEvent } from 'react';
import { useModal } from '../providers/ModalProvider';

import CloseIcon from './CloseIcon';
import './index.scss';

interface IProps {
  children: JSX.Element;
  closeModal: () => void;
}

const ModalLayout = ({ children, closeModal }: IProps) => {
  const handleCloseModal = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const currTarget = e.currentTarget as HTMLElement;

    if (target === currTarget) {
      closeModal();
    }
  };

  return (
    <div className="modal" aria-label="modal" onClick={handleCloseModal}>
      <div className="modal-inner">
        <CloseIcon closeModal={handleCloseModal} />
        {children}
      </div>
      <div className="modal-shadow" />
    </div>
  );
};

export { ModalLayout };
