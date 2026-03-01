import React, { FormEvent } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import forgotPasswordPageStyles from './forgot-password-page.module.css';
import { useAppDispatch } from '../../types/typed-redux-hooks';
import { resetPasswordUser } from '../../services/user/user.thunks';
import useFormAndValidation from '../../hooks/use-form-and-validation';

export default function ForgotPasswordPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);
  const {
    values, handleChange, handleBlur, handleFocus, errors, touched, isValid,
  } = useFormAndValidation({ email: '' });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isLoading || !isValid) return;

    setIsLoading(true);

    dispatch(resetPasswordUser(values))
      .unwrap()
      .then(() => { navigate('/reset-password'); })
      .catch((error: unknown) => {
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
