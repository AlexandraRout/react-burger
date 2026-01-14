import React from 'react';
import PropTypes from 'prop-types';
import ingredientPropType from '../../shared/types/ingredient-prop-type';
import MobileBar from '../../shared/components/mobile-bar/mobile-bar';
import mobileOrderDetailsStyles from './mobile-order-details.module.css';
import MobileConstructorElement from '../mobile-constructor-element/mobile-constructor-element';

export default function MobileOrderDetails({
  bun, fillings, totalPrice, setIsOrdered,
}) {
  return (
    <div className={mobileOrderDetailsStyles.mobile_order_details}>
      <MobileConstructorElement image={bun.image} name={`${bun.name} (вверх)`} price={bun.price} />
      {fillings.map((filling) => (
        <MobileConstructorElement
          key={filling._id}
          image={filling.image_mobile}
          name={filling.name}
          price={filling.price}
        />
      ))}
      <MobileConstructorElement image={bun.image} name={`${bun.name} (низ)`} price={bun.price} />
      <MobileBar totalPrice={totalPrice} buttonText="Заказать" onClick={() => setIsOrdered(true)} />
    </div>
  );
}

MobileOrderDetails.propTypes = {
  bun: ingredientPropType.isRequired,
  fillings: PropTypes.arrayOf(ingredientPropType).isRequired,
  totalPrice: PropTypes.number.isRequired,
  setIsOrdered: PropTypes.func.isRequired,
};
