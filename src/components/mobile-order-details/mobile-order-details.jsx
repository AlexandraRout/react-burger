import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientPropType from '../../shared/types/ingredient-prop-type';
import MobileBar from '../../shared/components/mobile-bar/mobile-bar';
import mobileOrderDetailsStyles from './mobile-order-details.module.css';

export default function MobileOrderDetails({
  ingredients, count, setIsOrdered,
}) {
  return (
    <div className={mobileOrderDetailsStyles.mobile_order_details}>
      {ingredients.map((ingredient, index) => (
        <div
          className={mobileOrderDetailsStyles.ingredient}
          /* eslint-disable-next-line react/no-array-index-key */
          key={ingredient.name + index}
        >
          <DragIcon type="primary" className={mobileOrderDetailsStyles.icon} />
          <div className={mobileOrderDetailsStyles.ingredient_container}>
            <img src={ingredient.image_mobile} alt={ingredient.name} width="52" height="26" className={mobileOrderDetailsStyles.image} />
            <p className={`${mobileOrderDetailsStyles.element_name} text text_type_main-default`}>{ingredient.name}</p>
            <p className="text text_type_digits-default">{ingredient.price}</p>
            <CurrencyIcon type="primary" className={mobileOrderDetailsStyles.icon} />
          </div>
        </div>
      ))}
      <MobileBar count={count} buttonText="Заказать" onClick={() => setIsOrdered(true)} />
    </div>
  );
}

MobileOrderDetails.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  count: PropTypes.number.isRequired,
  setIsOrdered: PropTypes.func.isRequired,
};
