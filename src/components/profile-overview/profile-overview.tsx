import React, { useState, useEffect, FormEvent } from 'react';
import {
  Button, EmailInput, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../types/typed-redux-hooks';
import { updateUser } from '../../services/user/user.thunks';
import profileOverviewStyles from './profile-overview.module.css';
import useFormAndValidation from '../../hooks/use-form-and-validation';

export default function ProfileOverview() {
  const dispatch = useAppDispatch();

  const { user, isLoading } = useAppSelector((state) => state.user);
  const {
    values, handleChange, handleBlur, handleFocus, errors, touched, isValid, setValues,
  } = useFormAndValidation({ name: '', email: '', password: '' });
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    if (user) {
      setValues({
        name: user.name || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [user]);

  useEffect(() => {
    let hasChanges = false;
    if (user) {
      hasChanges = values.name !== user.name || values.email !== user.email || values.password !== '';
    }
    setShowSaveButton(hasChanges);
  }, [values, user]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isLoading || !isValid) return;

    try {
      await dispatch(updateUser(values)).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = () => {
    setValues({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
    });
  };

  return (
    <form className={profileOverviewStyles.profile_overview} onSubmit={handleSubmit}>
      <Input
        placeholder="Имя"
        name="name"
        size="default"
        value={values.name}
        icon="EditIcon"
        error={!!(touched.name && errors.name)}
        errorText={errors.name}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required
      />

      <div>
        <EmailInput
          placeholder="Логин"
          name="email"
          size="default"
          isIcon
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

      <PasswordInput
        placeholder="Пароль"
        name="password"
        icon="EditIcon"
        value={values.password}
        onChange={handleChange}
      />

      {showSaveButton && (
      <div className={profileOverviewStyles.profile_overview_buttons}>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
          {isLoading ? 'Загрузка...' : 'Сохранить'}
        </Button>

        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={handleReset}
        >
          Отмена
        </Button>
      </div>
      )}
    </form>
  );
}
