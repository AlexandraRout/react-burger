import refreshToken from './refresh-token';
import { setCookie } from '../utils/cookies';
import { checkResponse } from './fetch-with-check';

const isAuthError = (error) => error.status === 401 || error.message === 'jwt expired';

const handleTokenRefresh = async (url, options) => {
  const refreshData = await refreshToken();

  if (!refreshData.success) {
    throw refreshData;
  }

  setCookie('accessToken', refreshData.accessToken, 20);
  localStorage.setItem('refreshToken', refreshData.refreshToken);

  const retryOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: refreshData.accessToken,
    },
  };

  const retryResponse = await fetch(url, retryOptions);
  return checkResponse(retryResponse);
};

const fetchWithRefresh = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    return await checkResponse(response);
  } catch (error) {
    if (!isAuthError(error)) {
      throw error;
    }

    return handleTokenRefresh(url, options);
  }
};

export default fetchWithRefresh;
