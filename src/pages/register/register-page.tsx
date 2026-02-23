import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Button, EmailInput, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-redux-hooks';
import { registerUser } from '../../services/user/user.thunks';
import registerPageStyles from './register-page.module.css';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialErrorState = {
    name: '',
    email: '',
    password: '',
  };

  const { isLoading: loading } = useAppSelector((state) => state.user);

  const [form, setForm] = useState(initialErrorState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = 'Введите имя';
    if (!form.email.trim()) newErrors.email = 'Введите email';
    if (!form.password.trim()) newErrors.password = 'Введите пароль';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors(initialErrorState);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading || !validate()) return;

    try {
      await dispatch(registerUser(form)).unwrap();
      navigate('/profile', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={registerPageStyles.register_page_container}>
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
            errorText={errors.email}
            onChange={handleChange}
          />

          <PasswordInput
            placeholder="Пароль"
            name="password"
            value={form.password}
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
    </div>
  );
}
