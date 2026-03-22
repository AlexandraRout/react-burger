import React from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info.module.css';
import { IIngredient, OrderStatus, OrderStatusText } from '../../types';

interface IOrderInfoIngredient {
  ingredient: IIngredient;
  count: number;
}

interface IOrderInfoProps {
  name: string;
  status: OrderStatus;
  ingredients: IOrderInfoIngredient[];
  totalPrice: number;
  createdAt: string;
}

export default function OrderInfo({
  name, status, ingredients, totalPrice, createdAt,
}: IOrderInfoProps) {
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium mt-6">{name}</h2>

      <p className={`text text_type_main-default mt-3 ${status === OrderStatus.Done && styles.status_done}`}>
        {OrderStatusText[status]}
      </p>

      <p className="text text_type_main-medium mt-15 mb-6">
        Состав:
      </p>

      <div className={styles.ingredients_list}>
        {ingredients.map(({ ingredient, count }) => (
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
        <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(createdAt)} />
        <div className={styles.total_price}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
