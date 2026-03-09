import React from 'react';
import { useParams } from 'react-router-dom';
import OrderInfo from '../../components/order-info/order-info';
import styles from './order-details-page.module.css';

export default function OrderDetailsPage() {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <p className={`text text_type_digits-default ${styles.number}`}>
        #
        {String(id).padStart(6, '0')}
      </p>
      <OrderInfo />
    </div>
  );
}
