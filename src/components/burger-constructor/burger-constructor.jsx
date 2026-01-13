import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import ingredientPropType from '../../shared/types/ingredient-prop-type';
import OrderSummary from '../order-summary/order-summary';

export default function BurgerConstructor({ ingredients, count, orderId }) {
  return (
    <section className={burgerConstructorStyles.burger_constructor}>
      <div className={burgerConstructorStyles.burger_constructor_container}>
        <ConstructorElement
          type="top"
          isLocked
          text={ingredients[0].name}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image}
          extraClass={burgerConstructorStyles.base_element}
        />

        <div className={burgerConstructorStyles.elements_scroll}>
          {ingredients.map((ingredient, index) => (
            <div
              className={burgerConstructorStyles.element}
              /* eslint-disable-next-line react/no-array-index-key */
              key={ingredient.name + index}
            >
              <DragIcon type="primary" />
              <ConstructorElement
                key={ingredient.name}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </div>
          ))}
        </div>

        <ConstructorElement
          type="bottom"
          isLocked
          text={ingredients[1].name}
          price={ingredients[1].price}
          thumbnail={ingredients[1].image}
          extraClass={burgerConstructorStyles.base_element}
        />
      </div>

      <OrderSummary count={count} orderId={orderId} />
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  count: PropTypes.number.isRequired,
  orderId: PropTypes.number.isRequired,
};
