import React, { useState, useEffect } from 'react';
import {
  Button, EmailInput, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../services/user/user.thunks';
import profileOverviewStyles from './profile-overview.module.css';

export default function ProfileOverview() {
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.user);
  const [form, setForm] = useState({ name: user.name || '', email: user.email || '', password: '' });
  const [initialForm, setInitialForm] = useState({ name: user.name || '', email: user.email || '', password: '' });
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    const hasChanges = form.name !== initialForm.name
        || form.email !== initialForm.email || form.password !== initialForm.password;

    setShowSaveButton(hasChanges);
  }, [form, initialForm]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    try {
      await dispatch(updateUser(form)).unwrap();
      setInitialForm({ ...form });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={profileOverviewStyles.profile_overview} onSubmit={handleSubmit}>
      <Input
        placeholder="Имя"
        name="name"
        size="default"
        value={form.name}
        icon="EditIcon"
        onChange={handleChange}
      />

      <EmailInput
        placeholder="Логин"
        name="email"
        size="default"
        isIcon
        value={form.email}
        onChange={handleChange}
      />

      <PasswordInput
        placeholder="Пароль"
        name="password"
        icon="EditIcon"
        value={form.password}
        onChange={handleChange}
      />

      {showSaveButton && (
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={profileOverviewStyles.profile_overview_save_button}
        >
          {isLoading ? 'Загрузка...' : 'Сохранить'}
        </Button>
      )}
    </form>
  );
}
