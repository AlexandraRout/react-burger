import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import mobileBarStyles from './mobile-bar.module.css';

export default function MobileBar({
  buttonText,
  onClick = null,
  children = null,
}) {
  const ingredients = useSelector((state) => state.burgerConstructor.ingredients);
  const { totalPrice } = useSelector((state) => state.order);

  return (
    <div className={mobileBarStyles.mobile_bar}>
      <p className="text text_type_digits-default mr-2">{totalPrice}</p>
      <CurrencyIcon type="primary" />
      { ingredients.length > 0 && (
      <Button
        htmlType="button"
        type="primary"
        size="small"
        extraClass="ml-4"
        onClick={onClick}
      >
        {buttonText}
      </Button>
      )}
      {children}
    </div>
  );
}

MobileBar.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
