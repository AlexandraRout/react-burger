import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchWithCheck from '../../api/fetch-with-check';
import BASE_URL from '../../api/base-url-api';
import { IIngredient, IIngredientsApiResponse } from '../../types';

const url = `${BASE_URL}/ingredients`;

const fetchIngredients = createAsyncThunk<IIngredient[], void>(
  'burger-ingredients/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchWithCheck<IIngredientsApiResponse>(url);
      return data.data;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки ингредиентов');
    }
  },
);

export default fetchIngredients;
