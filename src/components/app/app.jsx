import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header';
import BurgerConstructorPage from '../../pages/burger-constructor/burger-constructor-page';
import LoginPage from '../../pages/login/login-page';
import RegisterPage from '../../pages/register/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password/reset-password-page';
import ProfilePage from '../../pages/profile/profile-page';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import ProfileOverview from '../profile-overview/profile-overview';
import OrdersHistory from '../orders-history/orders-history';
import useAuth from '../../hooks/use-auth';
import ForgotPasswordGuard from '../forgot-password-guard/forgot-password-guard';
import IngredientDetailsPage from '../../pages/ingredient-details-page/ingredient-details-page';
import fetchIngredients from '../../services/burger-ingredients/burger-ingredients.thunks';
import ModalIngredientDetails from '../modal-Ingredient-details/modal-Ingredient-details';
import appStyles from './app.module.css';

export default function App() {
  const dispatch = useDispatch();

  const location = useLocation();
  const background = location.state && location.state.background;
  const { checkAuth, isLoading } = useAuth();

  useEffect(() => {
    dispatch(fetchIngredients());
    checkAuth();
  }, [dispatch]);

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className={appStyles.app_container}>
      <AppHeader />
      <main className={appStyles.app_content}>
        <div className={appStyles.app_content_container}>
          <Routes location={background || location}>
            <Route path="/" element={<BurgerConstructorPage />} />
            <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />

            <Route path="/login" element={<ProtectedRouteElement isOnlyUnAuth element={<LoginPage />} />} />
            <Route path="/register" element={<ProtectedRouteElement isOnlyUnAuth element={<RegisterPage />} />} />

            <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}>
              <Route index element={<ProfileOverview />} />
              <Route path="orders" element={<OrdersHistory />} />
            </Route>

            <Route path="/forgot-password" element={<ProtectedRouteElement isOnlyUnAuth element={<ForgotPasswordPage />} />} />
            <Route path="/reset-password" element={<ProtectedRouteElement isOnlyUnAuth element={<ForgotPasswordGuard element={<ResetPasswordPage />} />} />} />
            )
          </Routes>

          {background && (
            <Routes>
              <Route path="/ingredients/:id" element={(<ModalIngredientDetails />)} />
            </Routes>
          )}
        </div>
      </main>
    </div>
  );
}
