import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import mobileBarStyles from './mobile-bar.module.css';

export default function MobileBar({
  totalPrice,
  buttonText,
  onClick = null,
  children = null,
}) {
  return (
    <div className={mobileBarStyles.mobile_bar}>
      <p className="text text_type_digits-default mr-2">{totalPrice}</p>
      <CurrencyIcon type="primary" />
      <Button
        htmlType="button"
        type="primary"
        size="small"
        extraClass="ml-4"
        onClick={onClick}
      >
        {buttonText}
      </Button>

      {children}
    </div>
  );
}

MobileBar.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
