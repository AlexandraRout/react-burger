import BASE_URL from './base-url-api';
import fetchWithCheck from './fetch-with-check';

const url = `${BASE_URL}/password-reset/reset`;

const confirmPasswordReset = async (options) => {
  try {
    await fetchWithCheck(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options),
    });
  } catch (error) {
    throw new Error('Ошибка отправки запроса, пожалуйста повторите попытку');
  }
};

export default confirmPasswordReset;
