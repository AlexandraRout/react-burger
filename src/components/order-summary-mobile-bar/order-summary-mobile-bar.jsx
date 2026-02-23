import React, { useState } from 'react';
import MobileBar from '../../shared/components/mobile-bar/mobile-bar';
import Modal from '../../shared/components/modal/modal';
import OrderDetails from '../order-details/order-details';
import MobileOrderDetails from '../mobile-order-details/mobile-order-details';

export default function OrderSummaryMobileBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setIsOrdered(false);
  };

  return (
    <MobileBar buttonText="Смотреть заказ" onClick={open}>
      {isOpen && (
      <Modal isOpen={isOpen} onClose={close} title={isOrdered ? 'Заказ оформлен' : 'Заказ'}>
        {isOrdered ? (
          <OrderDetails />
        ) : (
          <MobileOrderDetails setIsOrdered={setIsOrdered} />
        )}
      </Modal>
      )}
    </MobileBar>
  );
}
