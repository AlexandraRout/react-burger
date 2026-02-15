import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchWithCheck from '../../api/fetch-with-check';
import BASE_URL from '../../api/base-url-api';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookies';
import fetchWithRefresh from '../../api/fetch-with-refresh';

// Регистрация
export const registerUser = createAsyncThunk(
  'user/register',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await fetchWithCheck(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setCookie('accessToken', data.accessToken, 20);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка регистрации');
    }
  },
);

// Авторизация (Логин)
export const loginUser = createAsyncThunk(
  'user/login',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await fetchWithCheck(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setCookie('accessToken', data.accessToken, 20);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка входа');
    }
  },
);

// Получение текущего пользователя
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getCookie('accessToken'),
        },
      });

      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка получения пользователя');
    }
  },
);

// Обновление данных пользователя
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const accessToken = getCookie('accessToken');

      const data = await fetchWithCheck(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(userData),
      });

      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка обновления пользователя');
    }
  },
);

// Выход из системы
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await fetchWithCheck(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
      });
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');

      return undefined;
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка выхода');
    }
  },
);

// Смена пароля
export const resetPasswordUser = createAsyncThunk(
  'user/resetPassword',
  async (options, { rejectWithValue }) => {
    try {
      return await fetchWithCheck(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options),
      });
    } catch (error) {
      return rejectWithValue(error.message || 'Ошибка отправки запроса, пожалуйста повторите попытку');
    }
  },
);
