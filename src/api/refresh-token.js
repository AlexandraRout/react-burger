import fetchWithCheck from './fetch-with-check';
import BASE_URL from './base-url-api';

const url = `${BASE_URL}/auth/token`;

const refreshToken = async () => {
  try {
    return await fetchWithCheck(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    });
  } catch (error) {
    throw new Error('Ошибка обновления токена');
  }
};

export default refreshToken;
