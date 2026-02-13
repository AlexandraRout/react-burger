import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithCheck } from '../../api/fetch-with-check';
import BASE_URL from '../../api/base-url-api';
import { getCookie } from '../../utils/cookies';

const ulr = `${BASE_URL}/orders`;

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients, { rejectWithValue }) => {
    const accessToken = getCookie('accessToken');

    try {
      return fetchWithCheck(ulr, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        Authorization: `${accessToken}`,
        body: JSON.stringify({ ingredients }),
      });
    } catch (error) {
      return rejectWithValue(
        'Произошла ошибка создания заказа, пожалуйста, повторите попытку снова',
      );
    }
  },
);

export default createOrder;
