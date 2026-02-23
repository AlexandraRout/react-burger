import React, { ReactNode } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../../hooks/typed-redux-hooks';
import mobileBarStyles from './mobile-bar.module.css';

interface IMobileBarProps {
  buttonText: string;
  onClick?: (() => void) | null;
  children?: ReactNode;
}

export default function MobileBar({
  buttonText,
  onClick = null,
  children = null,
}: IMobileBarProps) {
  const ingredients = useAppSelector((state) => state.burgerConstructor.ingredients);
  const { totalPrice } = useAppSelector((state) => state.order);

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
        onClick={onClick ?? undefined}
      >
        {buttonText}
      </Button>
      )}
      {children}
    </div>
  );
}
