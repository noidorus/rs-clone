import React, { createContext, useContext, useState } from 'react';
import { ModalLayout } from '../modalLayout';

interface ModalContextProps {
  Modal: JSX.Element | null;
  setModal: (children: JSX.Element) => void;
  closeModal: () => void;
}

interface ModalProviderProps {
  children: JSX.Element;
}

const ModalContext = createContext<ModalContextProps>({
  Modal: null,
  setModal: () => {},
  closeModal: () => {},
});

const ModalProvider = ({ children }: ModalProviderProps) => {
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
