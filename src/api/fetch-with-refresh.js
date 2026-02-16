import refreshToken from './refresh-token';
import { setCookie } from '../utils/cookies';
import fetchWithCheck from './fetch-with-check';

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

  return fetchWithCheck(url, retryOptions);
};

const fetchWithRefresh = async (url, options = {}) => {
  try {
    return await fetchWithCheck(url, options);
  } catch (error) {
    if (!isAuthError(error)) {
      throw error;
    }

    return handleTokenRefresh(url, options);
  }
};

export default fetchWithRefresh;
