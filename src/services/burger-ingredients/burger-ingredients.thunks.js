import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchWithCheck from '../../api/fetch-with-check';
import BASE_URL from '../../api/base-url-api';

const url = `${BASE_URL}/ingredients`;

const fetchIngredients = createAsyncThunk(
  'burger-ingredients/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchWithCheck(url);
      return data.data;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки ингредиентов');
    }
  },
);

export default fetchIngredients;
