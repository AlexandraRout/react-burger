import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

export default function ModalOverlay({ onClick }) {
  return (
    <div
      role="button"
      aria-label="Закрыть модальное окно"
      aria-hidden
      className={modalOverlayStyles.modal_overlay}
      onClick={onClick}
    />
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
