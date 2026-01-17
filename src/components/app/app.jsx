import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import useFetch from '../../hooks/use-fetch';
import OrderSummaryMobileBar from '../order-summary-mobile-bar/order-summary-mobile-bar';
import appStyles from './app.module.css';

export default function App() {
  const { data, isLoading, error } = useFetch('/ingredients');

  const bun = data && data.data ? data.data.find((item) => item.type === 'bun') : null;
  const fillings = data && data.data ? data.data.filter((item) => item.type !== 'bun') : [];

  const bunPrice = bun ? bun.price * 2 : 0;
  const fillingsPrice = fillings.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = bunPrice + fillingsPrice;

  const orderId = 453438;

  return (
    <BrowserRouter>
      <div className={appStyles.app_container}>
        <AppHeader />
        <main className={appStyles.app_content}>
          <div className={appStyles.app_content_container}>
            <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
            {isLoading && <p className="text text text_type_main-default">Загрузка...</p>}
            {error && <p className="text text text_type_main-default">{error}</p>}
            {data && data.data && data.data.length > 0
            && (
            <>
              <div className={appStyles.burger_container}>
                <BurgerIngredients ingredients={data.data} />
                <div className={appStyles.burger_constructor}>
                  <BurgerConstructor
                    bun={bun}
                    fillings={fillings}
                    totalPrice={totalPrice}
                    orderId={orderId}
                  />
                </div>
              </div>
              <div className={appStyles.app_mobile_bar}>
                <OrderSummaryMobileBar
                  bun={bun}
                  fillings={fillings}
                  totalPrice={totalPrice}
                  orderId={orderId}
                />
              </div>
            </>
            )}
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
