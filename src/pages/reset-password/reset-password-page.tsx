import React, { FormEvent } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../types/typed-redux-hooks';
import resetPasswordPageStyles from './reset-password-page.module.css';
import { confirmPasswordReset } from '../../services/user/user.thunks';
import useFormAndValidation from '../../hooks/use-form-and-validation';

export default function ResetPasswordPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);

  const {
    values, handleChange, handleBlur, handleFocus, errors, touched, isValid,
  } = useFormAndValidation({ password: '', token: '' });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isLoading || !isValid) return;

    setIsLoading(true);

    dispatch(confirmPasswordReset(values))
      .unwrap()
      .then(() => { navigate('/login', { replace: true }); })
      .catch((error: unknown) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={resetPasswordPageStyles.reset_password_page_container}>
      <div className={resetPasswordPageStyles.reset_password_page}>
        <h1 className="text text text_type_main-medium">Восстановление пароля</h1>

        <form className={resetPasswordPageStyles.reset_password_form} onSubmit={handleSubmit}>
          <div>
            <PasswordInput
              placeholder="Введите новый пароль"
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

          <Input
            placeholder="Введите код из письма"
            name="token"
            value={values.token}
            error={!!(touched.token && errors.token)}
            errorText={errors.token}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required
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
    </div>
  );
}
