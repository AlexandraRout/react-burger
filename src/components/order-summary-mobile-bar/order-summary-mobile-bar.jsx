import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ingredientPropType from '../../shared/types/ingredient-prop-type';
import MobileBar from '../../shared/components/mobile-bar/mobile-bar';
import Modal from '../../shared/components/modal/modal';
import OrderDetails from '../order-details/order-details';
import MobileOrderDetails from '../mobile-order-details/mobile-order-details';

export default function OrderSummaryMobileBar({
  bun, fillings, totalPrice, orderId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <MobileBar
      totalPrice={totalPrice}
      buttonText="Смотреть заказ"
      onClick={open}
    >
      {isOpen && (
      <Modal
        isOpen={isOpen}
        onClose={close}
        title={isOrdered ? 'Заказ оформлен' : 'Заказ'}
      >
        {isOrdered ? (
          <OrderDetails orderId={orderId} />
        ) : (
          <MobileOrderDetails
            bun={bun}
            fillings={fillings}
            totalPrice={totalPrice}
            orderId={orderId}
            setIsOrdered={setIsOrdered}
          />
        )}
      </Modal>
      )}
    </MobileBar>
  );
}

OrderSummaryMobileBar.propTypes = {
  bun: ingredientPropType.isRequired,
  fillings: PropTypes.arrayOf(ingredientPropType).isRequired,
  totalPrice: PropTypes.number.isRequired,
  orderId: PropTypes.number.isRequired,
};
