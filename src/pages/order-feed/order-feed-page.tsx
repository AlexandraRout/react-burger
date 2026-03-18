import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrderCard from '../../components/order-card/order-card';
import { useAppDispatch, useAppSelector } from '../../types/typed-redux-hooks';
import { connect, disconnect } from '../../services/order-feed/order-feed.slice';
import { OrderStatus } from '../../types';
import orderFeedPageStyles from './order-feed-page.module.css';

const WS_URL = 'wss://norma.education-services.ru/orders/all';

export default function OrderFeedPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { orders, total, totalToday } = useAppSelector((state) => state.ordersFeed);

  useEffect(() => {
    dispatch(connect(WS_URL));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  const doneOrders = orders.filter((order) => order.status === OrderStatus.Done);
  const inProgressOrders = orders.filter((order) => [OrderStatus.Pending, OrderStatus.Created].includes(order.status));

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>

      <div className={orderFeedPageStyles.content}>
        <div className={orderFeedPageStyles.orders_list}>
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/feed/${order.number}`}
              state={{ background: location }}
            >
              <OrderCard order={order} />
            </Link>
          ))}
        </div>

        <div className={orderFeedPageStyles.stats}>
          <div className={orderFeedPageStyles.status_columns}>
            <div className={orderFeedPageStyles.status_column}>
              <p className="text text_type_main-medium mb-6">Готово:</p>
              <ul className={orderFeedPageStyles.status_list}>
                {doneOrders.slice(0, 10).map((o) => (
                  <li key={o._id} className={`text text_type_digits-default ${orderFeedPageStyles.status_number_done}`}>
                    {String(o.number).padStart(6, '0')}
                  </li>
                ))}
              </ul>
            </div>

            <div className={orderFeedPageStyles.status_column}>
              <p className="text text_type_main-medium mb-6">В работе:</p>
              <ul className={orderFeedPageStyles.status_list}>
                {inProgressOrders.slice(0, 10).map((o) => (
                  <li key={o._id} className="text text_type_digits-default">
                    {String(o.number).padStart(6, '0')}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <span className={`text text_type_digits-large ${orderFeedPageStyles.total_number}`}>
              {total}
            </span>
          </div>

          <div className={orderFeedPageStyles.total_block}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <span className={`text text_type_digits-large ${orderFeedPageStyles.total_number}`}>
              {totalToday}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
