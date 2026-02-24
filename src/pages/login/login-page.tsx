import React, { FormEvent } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../types/typed-redux-hooks';
import loginPageStyles from './login-page.module.css';
import { loginUser } from '../../services/user/user.thunks';
import useFormAndValidation from '../../hooks/use-form-and-validation';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state && location.state.from && location.state.from.pathname) || '/';

  const {
    values, handleChange, handleBlur, handleFocus, errors, touched, isValid,
  } = useFormAndValidation({ email: '', password: '' });
  const { isLoading: loading } = useAppSelector((state) => state.user);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading || !isValid) return;

    try {
      await dispatch(loginUser(values)).unwrap();
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={loginPageStyles.login_page_container}>
      <div className={loginPageStyles.login_page}>
        <h1 className="text text text_type_main-medium">Вход</h1>

        <form className={loginPageStyles.login_page_form} onSubmit={handleSubmit}>
          <div>
            <EmailInput
              placeholder="E-mail"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              required
            />
            {touched.email && errors.email && (
              <p className="text text_type_main-default text_color_error ml-6">{errors.email}</p>
            )}
          </div>

          <div>
            <PasswordInput
              placeholder="Пароль"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              required
            />
            {touched.password && errors.password && (
              <p className="text text_type_main-default text_color_error ml-6">{errors.password}</p>
            )}
          </div>

          <Button htmlType="submit" type="primary" size="medium">{loading ? 'Загрузка...' : 'Войти'}</Button>
        </form>

        <div className="mt-20">
          <span className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </span>
          <Link to="/register" className="ml-2 text text_type_main-default text_color_accent">
            Зарегистрироваться
          </Link>
        </div>

        <div className="mt-4">
          <span className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </span>
          <Link to="/forgot-password" className="ml-2 text text_type_main-default text_color_accent">
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
}
