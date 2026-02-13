import React, { useState } from 'react';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../services/user/user.thunks';
import profileOverviewStyles from './profile-overview.module.css';

export default function ProfileOverview() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const [form, setForm] = useState({ name: user.name || '', email: user.email || '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    dispatch(updateUser(form));
  };

  return (
    <form className={profileOverviewStyles.profile_overview}>
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
    </form>
  );
}
