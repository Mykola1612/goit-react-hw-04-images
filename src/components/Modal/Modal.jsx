import { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ photo, toggleModal, toggleModalEsc }) => {
  const handleOnClickOverlay = e => {
    if (e.target.nodeName !== 'IMG') {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModalEsc();
    }
  };

  return (
    <div className={styles.Overlay} onClick={handleOnClickOverlay}>
      <div className={styles.Modal}>
        <img src={photo} alt="" />
      </div>
    </div>
  );
};

export default Modal;
