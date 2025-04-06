import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ModalWrapper } from '../../components/ModalWrapper';

type ModalContent = {
  component: React.FC<any>;
  props?: Record<string, any>;
};

type ModalContextType = {
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
  isOpen: boolean;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  const openModal = (content: ModalContent) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      {isOpen && modalContent?.component && (
        <ModalWrapper onClose={closeModal}>
          <modalContent.component {...modalContent.props} onClose={closeModal} />
        </ModalWrapper>
      )}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModalContext musi być uzyte w zakresie ModalProvider');
  return ctx;
};
