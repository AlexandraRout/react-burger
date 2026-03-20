import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrderCard from '../../components/order-card/order-card';
import { useAppDispatch, useAppSelector } from '../../types/typed-redux-hooks';
import { connect, disconnect } from '../../services/orders-feed/orders-feed.slice';
import { OrderStatus } from '../../types';
import { wsAllOrdersUrl } from '../../api/ws-url';
import feedPageStyles from './feed-page.module.css';

export default function OrderFeedPage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { orders, total, totalToday } = useAppSelector((state) => state.ordersFeed);

  useEffect(() => {
    dispatch(connect(wsAllOrdersUrl));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  const doneOrders = orders.filter((order) => order.status === OrderStatus.Done);
  const inProgressOrders = orders.filter((order) => [OrderStatus.Pending, OrderStatus.Created].includes(order.status));

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>

      <div className={feedPageStyles.content}>
        <div className={feedPageStyles.orders_list}>
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

        <div className={feedPageStyles.stats}>
          <div className={feedPageStyles.status_columns}>
            <div className={feedPageStyles.status_column}>
              <p className="text text_type_main-medium mb-6">Готово:</p>
              <ul className={feedPageStyles.status_list}>
                {doneOrders.slice(0, 10).map((o) => (
                  <li key={o._id} className={`text text_type_digits-default ${feedPageStyles.status_number_done}`}>
                    {String(o.number).padStart(6, '0')}
                  </li>
                ))}
              </ul>
            </div>

            <div className={feedPageStyles.status_column}>
              <p className="text text_type_main-medium mb-6">В работе:</p>
              <ul className={feedPageStyles.status_list}>
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
            <span className={`text text_type_digits-large ${feedPageStyles.total_number}`}>
              {total}
            </span>
          </div>

          <div className={feedPageStyles.total_block}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <span className={`text text_type_digits-large ${feedPageStyles.total_number}`}>
              {totalToday}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
