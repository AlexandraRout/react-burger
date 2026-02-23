import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React from 'react';
import burgerConstructorPageStyles from './burger-constructor-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import OrderSummaryMobileBar from '../../components/order-summary-mobile-bar/order-summary-mobile-bar';

export default function BurgerConstructorPage() {
  return (
    <>
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
      <DndProvider backend={HTML5Backend}>
        <div className={burgerConstructorPageStyles.burger_constructor_container}>
          <BurgerIngredients />
          <div className={burgerConstructorPageStyles.burger_constructor}>
            <BurgerConstructor />
          </div>
        </div>
        <div className={burgerConstructorPageStyles.mobile_bar}>
          <OrderSummaryMobileBar />
        </div>
      </DndProvider>
    </>
  );
}
