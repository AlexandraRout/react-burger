import React, { useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrderCard from '../order-card/order-card';
import { useAppDispatch, useAppSelector } from '../../types/typed-redux-hooks';
import { userOrdersConnect, userOrdersDisconnect } from '../../services/user-orders/user-orders.slice';
import { getCookie } from '../../utils/cookies';
import { wsUserOrdersUrl } from '../../api/ws-url';
import refreshToken from '../../api/refresh-token';
import styles from './orders-history.module.css';

export default function OrdersHistory() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { orders, error } = useAppSelector((state) => state.userOrders);
  const isIngredientsLoaded = useAppSelector((state) => state.burgerIngredients.items.length > 0);

  const connectWithToken = useCallback(() => {
    const accessToken = (getCookie('accessToken') ?? '').replace('Bearer ', '');
    dispatch(userOrdersConnect(`${wsUserOrdersUrl}?token=${accessToken}`));
  }, [dispatch]);

  useEffect(() => {
    connectWithToken();
    return () => {
      dispatch(userOrdersDisconnect());
    };
  }, [dispatch, connectWithToken]);

  useEffect(() => {
    if (error === 'Invalid or missing token') {
      dispatch(userOrdersDisconnect());
      refreshToken().then(() => connectWithToken());
    }
  }, [error, dispatch, connectWithToken]);

  if (!isIngredientsLoaded) return null;

  return (
    <div className={styles.list}>
      {[...orders].reverse().map((order) => (
        <Link
          key={order._id}
          to={`/profile/orders/${order.number}`}
          state={{ background: location }}
        >
          <OrderCard order={order} showStatus />
        </Link>
      ))}
    </div>
  );
}
