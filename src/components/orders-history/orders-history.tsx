import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrderCard from '../order-card/order-card';
import mockOrders from '../../mocks/orders';
import styles from './orders-history.module.css';

export default function OrdersHistory() {
  const location = useLocation();

  return (
    <div className={styles.list}>
      {mockOrders.map((order) => (
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
