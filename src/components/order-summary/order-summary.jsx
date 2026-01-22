import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../shared/components/modal/modal';
import OrderDetails from '../order-details/order-details';
import useModal from '../../hooks/use-modal';
import orderSummaryStyles from './order-summary.module.css';
import createOrder from '../../services/order/order.thunks';

export default function OrderSummary() {
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.burgerConstructor.ingredients);
  const { orderId, isLoading, totalPrice } = useSelector((state) => state.order);
  const { isOpen, open, close } = useModal();

  const handleCreateOrder = async () => {
    if (isLoading) return;

    const ingredientIds = ingredients.map((ingredient) => ingredient._id);
    try {
      await dispatch(createOrder(ingredientIds)).unwrap();
      open();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={orderSummaryStyles.order_summary}>
      <div className="text text_type_digits-medium mr-2">{totalPrice}</div>
      <CurrencyIcon type="primary" />
      <Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={handleCreateOrder}>
        {isLoading ? 'Резервируем булочки...' : 'Оформить заказ'}
      </Button>
      {
        isOpen && (
        <Modal isOpen={isOpen} onClose={close}><OrderDetails orderId={orderId} /></Modal>)
      }
    </div>
  );
}
