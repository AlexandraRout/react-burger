import { createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://norma.education-services.ru/api/ingredients';

const fetchIngredients = createAsyncThunk(
  'burger-ingredients/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      return data.data;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки ингредиентов');
    }
  },
);

export default fetchIngredients;
