interface IApiError extends Error {
  status?: number;
  data?: Record<string, unknown>;
}

const checkResponse = async <T>(response: Response): Promise<T> => {
  if (response.ok) {
    return response.json();
  }

  const errorData = await response.json().catch(() => ({}));

  const error: IApiError = new Error(errorData.message || `Ошибка: ${response.status}`);
  error.status = response.status;
  error.data = errorData;

  throw error;
};

const fetchWithCheck = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  return checkResponse<T>(response);
};

export default fetchWithCheck;
