import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import mobileBarStyles from './mobile-bar.module.css';

export default function MobileBar({
  count,
  buttonText,
  onClick,
  children,
}) {
  return (
    <div className={mobileBarStyles.mobile_bar}>
      <p className="text text_type_digits-default mr-2">{count}</p>
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

MobileBar.defaultProps = {
  onClick: null,
  children: null,
};

MobileBar.propTypes = {
  count: PropTypes.number.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
