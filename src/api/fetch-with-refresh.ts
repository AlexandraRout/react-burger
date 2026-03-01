import refreshToken from './refresh-token';
import { setCookie } from '../utils/cookies';
import fetchWithCheck from './fetch-with-check';

interface IApiError extends Error {
  status?: number;
}

const isAuthError = (error: IApiError): boolean => error.status === 401 || error.message === 'jwt expired';

const handleTokenRefresh = async <T>(url: string, options: RequestInit): Promise<T> => {
  const refreshData = await refreshToken();

  if (!refreshData.success) {
    throw refreshData;
  }

  setCookie('accessToken', refreshData.accessToken, 20);
  localStorage.setItem('refreshToken', refreshData.refreshToken);

  const retryOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: refreshData.accessToken,
    },
  };

  return fetchWithCheck<T>(url, retryOptions);
};

const fetchWithRefresh = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    return await fetchWithCheck<T>(url, options);
  } catch (error) {
    if (!isAuthError(error as IApiError)) {
      throw error;
    }

    return handleTokenRefresh<T>(url, options);
  }
};

export default fetchWithRefresh;
