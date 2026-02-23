import fetchWithCheck from './fetch-with-check';
import BASE_URL from './base-url-api';
import { ITokenRefreshResponse } from '../types';

const url = `${BASE_URL}/auth/token`;

const refreshToken = async (): Promise<ITokenRefreshResponse> => {
  try {
    return await fetchWithCheck<ITokenRefreshResponse>(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    });
  } catch (error) {
    throw new Error('Ошибка обновления токена');
  }
};

export default refreshToken;
