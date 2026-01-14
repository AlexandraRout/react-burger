import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import ingredientPropType from '../../shared/types/ingredient-prop-type';
import OrderSummary from '../order-summary/order-summary';

export default function BurgerConstructor({
  bun, fillings, totalPrice, orderId,
}) {
  return (
    <section className={burgerConstructorStyles.burger_constructor}>
      <div className={burgerConstructorStyles.burger_constructor_container}>
        <ConstructorElement
          type="top"
          isLocked
          text={`${bun.name} (вверх)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={burgerConstructorStyles.base_element}
        />

        <div className={burgerConstructorStyles.elements_scroll}>
          {fillings.map((filling) => (
            <div
              className={burgerConstructorStyles.element}
              key={filling._id}
            >
              <DragIcon type="primary" />
              <ConstructorElement
                text={filling.name}
                price={filling.price}
                thumbnail={filling.image}
              />
            </div>
          ))}
        </div>

        <ConstructorElement
          type="bottom"
          isLocked
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
          extraClass={burgerConstructorStyles.base_element}
        />
      </div>

      <OrderSummary totalPrice={totalPrice} orderId={orderId} />
    </section>
  );
}

BurgerConstructor.propTypes = {
  bun: ingredientPropType.isRequired,
  fillings: PropTypes.arrayOf(ingredientPropType).isRequired,
  totalPrice: PropTypes.number.isRequired,
  orderId: PropTypes.number.isRequired,
};
