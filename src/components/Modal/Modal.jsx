import { useEffect } from 'react';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

const Modal = ({ url, onClick }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      onClick();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => {
      document.removeEventListener('keydown', closeModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.overlay} onClick={closeModal}>
      <div className={s.modal}>
        <img src={url} alt="large img" />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
