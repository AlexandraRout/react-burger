import React from 'react';
import burgerConstructorEmptyStateStyles from './burger-constructor-empty-state.module.css';

export default function BurgerConstructorEmptyState() {
  return (
    <div className={burgerConstructorEmptyStateStyles.empty_state}>
      <p className={`${burgerConstructorEmptyStateStyles.text} text text_type_main-default text_color_inactive`}>
        Перенесите ингредиенты в эту область для создания бургера мечты 🍔
      </p>
    </div>
  );
}
