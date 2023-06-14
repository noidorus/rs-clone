import React, { createContext, useContext, useState } from 'react';
import { ModalLayout } from '../modalLayout';
import { IModalContext, ProviderProps } from './types';

const ModalContext = createContext<IModalContext>({
  Modal: null,
  setModal: () => {},
  closeModal: () => {},
});

const ModalProvider = ({ children }: ProviderProps) => {
  const [Modal, setActiveModal] = useState<JSX.Element | null>(null);

  const closeModal = () => {
    setActiveModal(null);
  };

  const setModal = (children: JSX.Element) => {
    const content = (
      <ModalLayout closeModal={closeModal}>{children}</ModalLayout>
    );
    setActiveModal(content);
  };

  return (
    <ModalContext.Provider value={{ Modal, setModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalProvider, useModal };
