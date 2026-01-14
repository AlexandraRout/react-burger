import React from 'react';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import mobileConstructorElementStyles from './mobile-constructor-element.module.css';

export default function MobileConstructorElement({ image, name, price }) {
  return (
    <div className={mobileConstructorElementStyles.ingredient}>
      <DragIcon type="primary" className={mobileConstructorElementStyles.icon} />
      <div className={mobileConstructorElementStyles.ingredient_container}>
        <img src={image} alt={name} width="52" height="26" className={mobileConstructorElementStyles.image} />
        <p className={`${mobileConstructorElementStyles.element_name} text text_type_main-default`}>{name}</p>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" className={mobileConstructorElementStyles.icon} />
      </div>
    </div>
  );
}

MobileConstructorElement.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
