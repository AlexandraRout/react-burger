import React, { FormEvent } from 'react';
import {
  Button, EmailInput, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../types/typed-redux-hooks';
import { registerUser } from '../../services/user/user.thunks';
import registerPageStyles from './register-page.module.css';
import useFormAndValidation from '../../hooks/use-form-and-validation';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    values, handleChange, handleBlur, handleFocus, errors, touched, isValid,
  } = useFormAndValidation({ name: '', email: '', password: '' });
  const { isLoading: loading } = useAppSelector((state) => state.user);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading || !isValid) return;

    try {
      await dispatch(registerUser(values)).unwrap();
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
            value={values.name}
            error={!!(touched.name && errors.name)}
            errorText={errors.name}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required
          />

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
