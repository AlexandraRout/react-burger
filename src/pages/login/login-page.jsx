import React, { useState } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import loginPageStyles from './login-page.module.css';
import { loginUser } from '../../services/user/user.thunks';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialErrorState = { email: '', password: '' };

  const [form, setForm] = useState(initialErrorState);
  const [errors, setErrors] = useState({});
  const { loading } = useSelector((state) => state.user);

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) newErrors.email = 'Введите email';
    if (!form.password.trim()) newErrors.password = 'Введите пароль';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading || !validate()) return;

    try {
      await dispatch(loginUser(form)).unwrap();
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors(initialErrorState);
  };

  return (
    <div className={loginPageStyles.login_page_container}>
      <div className={loginPageStyles.login_page}>
        <h1 className="text text text_type_main-medium">Вход</h1>

        <form className={loginPageStyles.login_page_form} onSubmit={handleSubmit}>
          <EmailInput
            placeholder="E-mail"
            name="email"
            value={form.email}
            error={!!errors.email}
            errorText={errors.email}
            onChange={handleChange}
          />

          <PasswordInput
            placeholder="Пароль"
            name="password"
            value={form.password}
            error={!!errors.password}
            errorText={errors.password}
            onChange={handleChange}
          />

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
