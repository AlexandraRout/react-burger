import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchWithCheck from '../../api/fetch-with-check';
import BASE_URL from '../../api/base-url-api';
import { IOrder, IOrderByNumberResponse } from '../../types';

const fetchOrderByNumber = createAsyncThunk<IOrder, string>(
  'orderDetails/fetchOrderByNumber',
  async (number) => {
    const data = await fetchWithCheck<IOrderByNumberResponse>(`${BASE_URL}/orders/${number}`);
    return data.orders[0];
  },
);

export default fetchOrderByNumber;
