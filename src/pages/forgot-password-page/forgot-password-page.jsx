import React, { useState } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPasswordUser } from '../../services/user/user.thunks';
import forgotPasswordPageStyles from './forgot-password-page.module.css';

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialErrorState = { email: '' };

  const [form, setForm] = useState(initialErrorState);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = 'Введите email';
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors(initialErrorState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isLoading && !validate()) return;
    setIsLoading(true);

    dispatch(resetPasswordUser(form))
      .unwrap()
      .then(() => { navigate('/reset-password'); })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={forgotPasswordPageStyles.forgot_password_page_container}>
      <div className={forgotPasswordPageStyles.forgot_password_page}>
        <h1 className="text text text_type_main-medium">Восстановление пароля</h1>

        <form
          className={forgotPasswordPageStyles.forgot_password_page_form}
          onSubmit={handleSubmit}
        >
          <EmailInput
            placeholder="E-mail"
            name="email"
            value={form.email}
            error={!!errors.email}
            errorText={errors.email}
            onChange={handleChange}
          />

          <Button htmlType="submit" type="primary" size="medium">{isLoading ? 'Загрузка...' : 'Восстановить'}</Button>
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
    </div>
  );
}
