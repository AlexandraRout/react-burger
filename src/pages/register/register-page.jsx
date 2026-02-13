import React, { useState } from 'react';
import {
  Button, EmailInput, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../services/user/user.thunks';
import registerPageStyles from './register-page.module.css';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialErrorState = {
    name: '',
    email: '',
    password: '',
  };

  const { loading } = useSelector((state) => state.user);

  const [form, setForm] = useState(initialErrorState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Введите имя';
    if (!form.email.trim()) newErrors.email = 'Введите email';
    if (!form.password.trim()) newErrors.password = 'Введите пароль';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors(initialErrorState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (loading || !validate()) return;

    dispatch(registerUser(form)).unwrap();
    navigate('/profile', { replace: true });
  };

  return (
    <div className={registerPageStyles.register_page}>
      <h1 className="text text text_type_main-medium">Регистрация</h1>

      <form className={registerPageStyles.register_page_form} onSubmit={handleSubmit}>
        <Input
          placeholder="Имя"
          name="name"
          value={form.name}
          error={!!errors.name}
          errorText={errors.name}
          onChange={handleChange}
        />

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
        <Button htmlType="submit" type="primary" size="medium">{loading ? 'Загрузка...' : 'Зарегистрироваться'}</Button>
      </form>

      <div className="mt-20">
        <span className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </span>

        <Link to="/login" className="ml-2 text text_type_main-default text_color_accent">
          Войти
        </Link>
      </div>

    </div>
  );
}
