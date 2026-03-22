import React from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../../shared/components/modal/modal';
import OrderInfo from '../order-info/order-info';
import useOrderData from '../../hooks/use-order-data';

export default function ModalOrderDetails() {
  const { id } = useParams();
  const orderData = useOrderData(id);

  const onClose = () => {
    window.history.back();
  };

  return (
    <Modal
      title={<p className="text text_type_digits-default">{orderData ? `#${orderData.order.number}` : ''}</p>}
      isOpen
      onClose={onClose}
    >
      {orderData ? (
        <OrderInfo
          name={orderData.order.name}
          status={orderData.order.status}
          ingredients={orderData.uniqueIngredients}
          totalPrice={orderData.totalPrice}
          createdAt={orderData.order.createdAt}
        />
      ) : (
        <p className="text text_type_main-medium">Заказ не найден</p>
      )}
    </Modal>
  );
}
