const checkResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`);
  }

  return response.json();
};

const fetchWithCheck = async (url, options) => {
  const response = await fetch(url, options);
  return checkResponse(response);
};

export default fetchWithCheck;
