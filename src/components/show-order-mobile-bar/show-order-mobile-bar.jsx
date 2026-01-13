import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ingredientPropType from '../../shared/types/ingredient-prop-type';
import MobileBar from '../../shared/components/mobile-bar/mobile-bar';
import Modal from '../../shared/components/modal/modal';
import OrderDetails from '../order-details/order-details';
import MobileOrderDetails from '../mobile-order-details/mobile-order-details';

export default function ShowOrderMobileBar({ ingredients, count, orderId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <MobileBar
      count={count}
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
            ingredients={ingredients}
            count={count}
            orderId={orderId}
            setIsOrdered={setIsOrdered}
          />
        )}
      </Modal>
      )}
    </MobileBar>
  );
}

ShowOrderMobileBar.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  count: PropTypes.number.isRequired,
  orderId: PropTypes.number.isRequired,
};
