import BASE_URL from '../../api/base-url-api';
import { fetchWithCheck } from '../../api/fetch-with-check';

const url = `${BASE_URL}/password-reset/reset`;

const passwordResetReset = async (options) => {
  try {
    const data = await fetchWithCheck(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options),
    });
    return data.data;
  } catch (error) {
    throw new Error('Ошибка отправки запроса, пожалуйста повторите попытку');
  }
};

export default passwordResetReset;
