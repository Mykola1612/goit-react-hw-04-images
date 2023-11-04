import { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ photo, toggleModal }) => {
  const handleOnClickOverlay = e => {
    if (e.target.nodeName !== 'IMG') {
      toggleModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  return (
    <div className={styles.Overlay} onClick={handleOnClickOverlay}>
      <div className={styles.Modal}>
        <img src={photo} alt="" />
      </div>
    </div>
  );
};

export default Modal;
