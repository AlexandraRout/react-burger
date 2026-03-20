import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrderCard from '../order-card/order-card';
import { useAppDispatch, useAppSelector } from '../../types/typed-redux-hooks';
import { userOrdersConnect, userOrdersDisconnect } from '../../services/user-orders/user-orders.slice';
import { getCookie } from '../../utils/cookies';
import { wsUserOrdersUrl } from '../../api/ws-url';
import styles from './orders-history.module.css';

export default function OrdersHistory() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { orders } = useAppSelector((state) => state.userOrders);

  useEffect(() => {
    const accessToken = (getCookie('accessToken') ?? '').replace('Bearer ', '');
    dispatch(userOrdersConnect(`${wsUserOrdersUrl}?token=${accessToken}`));
    return () => {
      dispatch(userOrdersDisconnect());
    };
  }, [dispatch]);

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
