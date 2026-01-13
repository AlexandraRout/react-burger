import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../../shared/components/modal/modal';
import OrderDetails from '../order-details/order-details';
import useModal from '../../hooks/use-modal';
import orderSummaryStyles from './order-summary.module.css';

export default function OrderSummary({ count, orderId }) {
  const { isOpen, open, close } = useModal();

  return (
    <div className={orderSummaryStyles.order_summary}>
      <div className="text text_type_digits-medium mr-2">{count}</div>
      <CurrencyIcon type="primary" />
      <Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={open}>Оформить заказ</Button>
      {isOpen && (
      <Modal
        isOpen={isOpen}
        onClose={close}
      >
        <OrderDetails orderId={orderId} />
      </Modal>
      )}
    </div>
  );
}

OrderSummary.propTypes = {
  count: PropTypes.number.isRequired,
  orderId: PropTypes.number.isRequired,
};
