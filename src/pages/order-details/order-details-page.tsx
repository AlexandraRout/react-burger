import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderInfo from '../../components/order-info/order-info';
import useOrderData from '../../hooks/use-order-data';
import { useAppDispatch, useAppSelector } from '../../types/typed-redux-hooks';
import fetchOrderByNumber from '../../services/order-details/order-details.thunks';
import { clearOrder } from '../../services/order-details/order-details.slice';
import styles from './order-details-page.module.css';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const orderData = useOrderData(id);
  const isLoading = useAppSelector((state) => state.orderDetails.isLoading);

  useEffect(() => {
    if (!orderData && id) {
      dispatch(fetchOrderByNumber(id));
    }
  }, [dispatch, id, orderData]);

  useEffect(() => () => {
    dispatch(clearOrder());
  }, [dispatch]);

  if (!orderData) {
    if (isLoading) {
      return <p className="text text_type_main-medium">Загрузка...</p>;
    }
    return <p className="text text_type_main-medium">Заказ не найден</p>;
  }

  const { order } = orderData;

  return (
    <div className={styles.container}>
      <p className={`text text_type_digits-default ${styles.number}`}>
        #
        {order.number}
      </p>

      <OrderInfo
        name={order.name}
        status={order.status}
        ingredients={orderData.uniqueIngredients}
        totalPrice={orderData.totalPrice}
        createdAt={order.createdAt}
      />
    </div>
  );
}
