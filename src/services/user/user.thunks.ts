import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchWithCheck from '../../api/fetch-with-check';
import BASE_URL from '../../api/base-url-api';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookies';
import fetchWithRefresh from '../../api/fetch-with-refresh';
import { IAuthResponse, IUser } from '../../types';

interface ILoginForm {
  email: string;
  password: string;
}

interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

interface IResetPasswordForm {
  email: string;
}

interface IConfirmResetForm {
  password: string;
  token: string;
}

interface IUserResponse {
  success: boolean;
  user: IUser;
}

// Регистрация
export const registerUser = createAsyncThunk<IUser, IRegisterForm>(
  'user/register',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await fetchWithCheck<IAuthResponse>(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setCookie('accessToken', data.accessToken, 20);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Ошибка регистрации');
    }
  },
);

// Авторизация (Логин)
export const loginUser = createAsyncThunk<IUser, ILoginForm>(
  'user/login',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await fetchWithCheck<IAuthResponse>(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setCookie('accessToken', data.accessToken, 20);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Ошибка входа');
    }
  },
);

// Получение текущего пользователя
export const fetchUser = createAsyncThunk<IUser, void>(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchWithRefresh<IUserResponse>(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getCookie('accessToken') || '',
        },
      });

      return data.user;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Ошибка получения пользователя');
    }
  },
);

// Обновление данных пользователя
export const updateUser = createAsyncThunk<IUser, Partial<IRegisterForm>>(
  'user/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const accessToken = getCookie('accessToken');

      const data = await fetchWithCheck<IUserResponse>(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(userData),
      });

      return data.user;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Ошибка обновления пользователя');
    }
  },
);

// Выход из системы
export const logoutUser = createAsyncThunk<void, void>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await fetchWithCheck<{ success: boolean }>(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
      });
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');

      return undefined;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Ошибка выхода');
    }
  },
);

// Смена пароля
export const resetPasswordUser = createAsyncThunk<{ success: boolean }, IResetPasswordForm>(
  'user/resetPassword',
  async (options, { rejectWithValue }) => {
    try {
      return await fetchWithCheck<{ success: boolean }>(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options),
      });
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Ошибка отправки запроса, пожалуйста повторите попытку');
    }
  },
);

// Подтверждение смены пароля
export const confirmPasswordReset = createAsyncThunk<{ success: boolean }, IConfirmResetForm>(
  'user/confirmPasswordReset',
  async (options, { rejectWithValue }) => {
    try {
      return await fetchWithCheck<{ success: boolean }>(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options),
      });
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Ошибка отправки запроса, пожалуйста повторите попытку');
    }
  },
);
