import React from 'react';
import { useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../types/typed-redux-hooks';
import { IIngredient, OrderStatusText } from '../../types';
import mockOrders from '../../mocks/orders';
import styles from './order-info.module.css';

export default function OrderInfo() {
  const { id } = useParams();
  const allIngredients = useAppSelector((state) => state.burgerIngredients.items);

  const order = mockOrders.find((o) => o.number.toString() === id);

  if (!order) {
    return <p className="text text_type_main-medium">Заказ не найден</p>;
  }

  const countMap = new Map<string, number>();
  order.ingredients.forEach((ingId) => {
    countMap.set(ingId, (countMap.get(ingId) ?? 0) + 1);
  });

  const uniqueIngredients: { ingredient: IIngredient; count: number }[] = [];
  countMap.forEach((count, ingId) => {
    const found = allIngredients.find((ing) => ing._id === ingId);
    if (found) {
      uniqueIngredients.push({ ingredient: found, count });
    }
  });

  const totalPrice = uniqueIngredients.reduce(
    (sum, { ingredient, count }) => sum + ingredient.price * count,
    0,
  );

  const statusClass = order.status === 'done' ? styles.status_done : '';

  return (
    <div>
      <h2 className="text text_type_main-medium mt-6">{order.name}</h2>

      <p className={`text text_type_main-default mt-3 ${statusClass}`}>
        {OrderStatusText[order.status]}
      </p>

      <p className="text text_type_main-medium mt-15 mb-6">
        Состав:
      </p>

      <div className={styles.ingredients_list}>
        {uniqueIngredients.map(({ ingredient, count }) => (
          <div key={ingredient._id} className={styles.ingredient_row}>
            <div className={styles.ingredient_circle}>
              <img
                src={ingredient.image}
                alt={ingredient.name}
                width={64}
                height={64}
                className={styles.ingredient_image}
              />
            </div>
            <span className={`text text_type_main-default ${styles.ingredient_name}`}>
              {ingredient.name}
            </span>
            <div className={styles.ingredient_price}>
              <span className="text text_type_digits-default">
                {`${count} x ${ingredient.price}`}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(order.createdAt)} />
        <div className={styles.total_price}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
