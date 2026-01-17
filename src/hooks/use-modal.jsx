import React from 'react';

/** Кастомный хук для управления модальным окном */
export default function useModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close };
}
