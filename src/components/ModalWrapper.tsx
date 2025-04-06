import React from 'react';
import styles from './Modal.module.css';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export const ModalWrapper: React.FC<Props> = ({ onClose, children }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>✕</button>
        {children}
      </div>
    </div>
  );
};
