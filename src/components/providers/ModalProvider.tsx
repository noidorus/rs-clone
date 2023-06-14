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

  const setModal = (children: JSX.Element) => {
    const content = <ModalLayout>{children}</ModalLayout>;
    setActiveModal(content);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <ModalContext.Provider value={{ Modal, setModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalProvider, useModal };
