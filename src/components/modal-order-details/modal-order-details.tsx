import React from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../../shared/components/modal/modal';
import OrderInfo from '../order-info/order-info';

export default function ModalOrderDetails() {
  const { id } = useParams();

  const onClose = () => {
    window.history.back();
  };

  return (
    <Modal
      title={<p className="text text_type_digits-default">{`#${String(id).padStart(6, '0')}`}</p>}
      isOpen
      onClose={onClose}
    >
      <OrderInfo />
    </Modal>
  );
}
