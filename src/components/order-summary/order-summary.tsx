import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../types/typed-redux-hooks';
import orderSummaryStyles from './order-summary.module.css';
import { createOrder } from '../../services/order/order.thunks';
import { removeAllIngredientsFromConstructor } from '../../services/burger-constructor/burger-constructor.slice';

interface IOrderSummaryProps {
  onOrderCreated: () => void;
}

export default function OrderSummary({ onOrderCreated }: IOrderSummaryProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { ingredients } = useAppSelector((state) => state.burgerConstructor);
  const { isAuthChecked } = useAppSelector((state) => state.user);
  const { isLoading, totalPrice } = useAppSelector((state) => state.order);

  const handleCreateOrder = async () => {
    if (isLoading) return;

    if (isAuthChecked) {
      const ingredientIds = ingredients.map((ingredient) => ingredient._id);
      try {
        await dispatch(createOrder(ingredientIds)).unwrap();
        if (onOrderCreated) {
          onOrderCreated();
        }
        dispatch(removeAllIngredientsFromConstructor());
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={orderSummaryStyles.order_summary}>
      <div className="text text_type_digits-medium mr-2">{totalPrice}</div>
      <CurrencyIcon type="primary" />
      <Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={handleCreateOrder}>
        {isLoading ? 'Резервируем булочки...' : 'Оформить заказ'}
      </Button>
    </div>
  );
}
