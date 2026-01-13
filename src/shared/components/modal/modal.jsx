import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';

export default function Modal({
  isOpen, title, children, onClose,
}) {
  const modalRoot = document.getElementById('react-modals');

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.modal_overlay}>
        <ModalOverlay onClick={onClose} />
      </div>
      <div className={modalStyles.modal}>
        <div className={modalStyles.header}>
          {title && (<h2 className="text text_type_main-large">{title}</h2>)}
          <Button htmlType="button" type="secondary" size="small" extraClass={modalStyles.close_button} onClick={onClose}>
            <CloseIcon type="primary" />
          </Button>
        </div>
        <div className={modalStyles.content}>
          {children}
        </div>
      </div>
    </>,
    modalRoot,
  );
}

Modal.defaultProps = {
  title: '',
  children: null,
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
