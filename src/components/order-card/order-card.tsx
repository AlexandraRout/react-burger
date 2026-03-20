import React from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  IIngredient, IOrder, OrderStatus, OrderStatusText,
} from '../../types';
import { useAppSelector } from '../../types/typed-redux-hooks';
import orderCardStyles from './order-card.module.css';

const maxVisibleIngredients = 5;

interface IOrderCardProps {
  order: IOrder;
  showStatus?: boolean;
}

export default function OrderCard({ order, showStatus = false }: IOrderCardProps) {
  const allIngredients = useAppSelector((state) => state.burgerIngredients.items);

  const orderIngredients = order.ingredients
    .map((id) => allIngredients.find((ingredient) => ingredient._id === id))
    .filter((ingredient): ingredient is IIngredient => Boolean(ingredient));

  const totalPrice = orderIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);

  const visibleIngredients = orderIngredients.slice(0, maxVisibleIngredients);
  const extraIngredient = orderIngredients.length > maxVisibleIngredients
    ? orderIngredients[maxVisibleIngredients] : null;
  const hiddenCount = orderIngredients.length - maxVisibleIngredients;

  const countMap = new Map<string, number>();
  const visibleIngredientsWithKeys = visibleIngredients.map((ingredient) => {
    const count = (countMap.get(ingredient._id) ?? 0) + 1;
    countMap.set(ingredient._id, count);
    return { ing: ingredient, key: `${ingredient._id}-${count}` };
  });

  return (
    <div className={orderCardStyles.order_card}>
      <div className={orderCardStyles.container}>
        <span className="text text_type_digits-default">
          #
          {order.number}
        </span>
        <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(order.createdAt)} />
      </div>

      <div>
        <p className="text text_type_main-medium">{order.name}</p>

        {showStatus && (
          <p className={`text text_type_main-default mt-2 ${order.status === OrderStatus.Done && orderCardStyles.status_done}`}>
            {OrderStatusText[order.status]}
          </p>
        )}
      </div>

      <div className={orderCardStyles.container}>
        <div className={orderCardStyles.ingredients}>
          {visibleIngredientsWithKeys.map(({ ing, key }, i) => (
            <div
              key={key}
              className={orderCardStyles.ingredient_circle}
              style={{ zIndex: maxVisibleIngredients - i }}
            >
              <img src={ing.image} alt={ing.name} width={64} height={64} className={orderCardStyles.ingredient_image} />
            </div>
          ))}

          {extraIngredient && (
            <div className={orderCardStyles.ingredient_circle} style={{ zIndex: 0 }}>
              <img
                src={extraIngredient.image}
                alt={extraIngredient.name}
                className={orderCardStyles.ingredient_image}
              />
              <div className={orderCardStyles.ingredient_overlay}>
                <span className="text text_type_digits-default">
                  +
                  {hiddenCount}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className={orderCardStyles.price}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
