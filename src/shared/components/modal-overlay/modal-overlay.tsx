import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClick: () => void;
}

export default function ModalOverlay({ onClick }: IModalOverlayProps) {
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
