import React, { createContext, useContext, useState } from 'react';
import { ModalLayout } from '../modal';

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
    const { title }: { title?: string } = children.props;
    const content = <ModalLayout title={title}>{children}</ModalLayout>;
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
