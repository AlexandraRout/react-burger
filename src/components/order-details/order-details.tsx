import React from 'react';
import { useAppSelector } from '../../types/typed-redux-hooks';
import done from '../../images/done.svg';
import orderDetailsStyles from './order-details.module.css';

export default function OrderDetails() {
  const { orderId } = useAppSelector((state) => state.order);

  return (
    <div className={orderDetailsStyles.order_details}>
      <p className={`${orderDetailsStyles.order_id} mt-6 text text_type_digits-large`}>{orderId}</p>
      <p className="mt-8 text text_type_main-medium">идентификатор заказа</p>
      <img src={done} alt="Готово" width="120" height="120" className="mt-15" />
      <p className="mt-15 text text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="mt-2 mb-20 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}
