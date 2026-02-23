const checkResponse = async (response) => {
  if (response.ok) {
    return response.json();
  }

  const errorData = await response.json().catch(() => ({}));

  const error = new Error(errorData.message || `Ошибка: ${response.status}`);
  error.status = response.status;
  error.data = errorData;

  throw error;
};

const fetchWithCheck = async (url, options) => {
  const response = await fetch(url, options);
  return checkResponse(response);
};

export default fetchWithCheck;
