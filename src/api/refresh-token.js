import { checkResponse } from './fetch-with-check';
import BASE_URL from './base-url-api';

const refreshToken = () => fetch(`${BASE_URL}/auth/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
}).then((res) => checkResponse(res));

export default refreshToken;
