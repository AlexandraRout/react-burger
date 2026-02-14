import React, { useState } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import passwordResetReset from '../../services/api/reset-api';
import resetPasswordPageStyles from './reset-password-page.module.css';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const initialErrorState = { password: '', token: '' };

  const [form, setForm] = useState(initialErrorState);
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = React.useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.password.trim()) newErrors.password = 'Введите новый пароль';
    if (!form.token.trim()) newErrors.token = 'Введите токен';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoading || !validate()) return;

    setIsLoading(true);

    passwordResetReset(form).then(() => {
      navigate('/login', { replace: true });
    }).finally(() => setIsLoading(false));
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
    <div className={resetPasswordPageStyles.reset_password_page}>
      <h1 className="text text text_type_main-medium">Восстановление пароля</h1>

      <form className={resetPasswordPageStyles.reset_password_form} onSubmit={handleSubmit}>
        <PasswordInput
          placeholder="Введите новый пароль"
          name="password"
          value={form.password}
          error={!!errors.password}
          errorText={errors.password}
          onChange={handleChange}
        />
        <Input
          placeholder="Введите код из письма"
          name="token"
          value={form.token}
          error={!!errors.token}
          errorText={errors.token}
          onChange={handleChange}
        />

        <Button htmlType="submit" type="primary" size="medium">{isLoading ? 'Загрузка...' : 'Сохранить'}</Button>
      </form>

      <div className="mt-20">
        <span className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </span>
        <Link to="/login" className="ml-2 text text_type_main-default text_color_accent">
          Войти
        </Link>
      </div>
    </div>
  );
}
