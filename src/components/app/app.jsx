import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import useFetch from '../../hooks/use-fetch';
import ShowOrderMobileBar from '../show-order-mobile-bar/show-order-mobile-bar';
import appStyles from './app.module.css';

export default function App() {
  const { data, isLoading, error } = useFetch('/ingredients');

  const count = data && data.data ? data.data.reduce((acc, cur) => acc + cur.price, 0) : 0;
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
                  <BurgerConstructor ingredients={data.data} count={count} orderId={orderId} />
                </div>
              </div>
              <div className={appStyles.app_mobile_bar}>
                <ShowOrderMobileBar ingredients={data.data} count={count} orderId={orderId} />
              </div>
            </>
            )}
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
