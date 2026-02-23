import React, {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import {
  Button, EmailInput, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../hooks/typed-redux-hooks';
import { updateUser } from '../../services/user/user.thunks';
import profileOverviewStyles from './profile-overview.module.css';

export default function ProfileOverview() {
  const dispatch = useAppDispatch();

  const { user, isLoading } = useAppSelector((state) => state.user);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [user]);

  useEffect(() => {
    let hasChanges = false;
    if (user) {
      hasChanges = form.name !== user.name || form.email !== user.email || form.password !== '';
    }
    setShowSaveButton(hasChanges);
  }, [form, user]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isLoading) return;

    try {
      await dispatch(updateUser(form)).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = () => {
    setForm({
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
