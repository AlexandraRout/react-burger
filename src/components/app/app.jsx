import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderSummaryMobileBar from '../order-summary-mobile-bar/order-summary-mobile-bar';
import appStyles from './app.module.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className={appStyles.app_container}>
        <AppHeader />
        <main className={appStyles.app_content}>
          <div className={appStyles.app_content_container}>
            <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
            <DndProvider backend={HTML5Backend}>
              <>
                <div className={appStyles.burger_container}>
                  <BurgerIngredients />
                  <div className={appStyles.burger_constructor}>
                    <BurgerConstructor />
                  </div>
                </div>
                <div className={appStyles.app_mobile_bar}>
                  <OrderSummaryMobileBar />
                </div>
              </>
            </DndProvider>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
