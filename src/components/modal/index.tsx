import React, { MouseEvent } from 'react';
import { useModal } from '../providers/ModalProvider';

import CloseIcon from './CloseIcon';
import './index.scss';

interface IProps {
  children: JSX.Element;
  title?: string;
}

const ModalLayout = ({ children, title }: IProps) => {
  const { closeModal } = useModal();

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
        {title && <h3 className="modal-title">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export { ModalLayout };
