import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import mobileConstructorElementStyles from './mobile-constructor-element.module.css';

interface IMobileConstructorElementProps {
  image: string;
  name: string;
  price: number;
  extraClasses?: string;
}

export default function MobileConstructorElement({
  image, name, price, extraClasses = '',
}: IMobileConstructorElementProps) {
  return (
    <div className={`${mobileConstructorElementStyles.ingredient} ${extraClasses}`}>
      <img src={image} alt={name} width="52" height="26" className={mobileConstructorElementStyles.image} />
      <p className={`${mobileConstructorElementStyles.element_name} text text_type_main-default`}>{name}</p>
      <p className="text text_type_digits-default">{price}</p>
      <CurrencyIcon type="primary" className={mobileConstructorElementStyles.icon} />
    </div>
  );
}
