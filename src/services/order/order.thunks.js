import { createAsyncThunk } from '@reduxjs/toolkit';

const ulr = 'https://norma.education-services.ru/api/orders';

const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients, { rejectWithValue }) => {
    try {
      const response = await fetch(
        ulr,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ingredients,
          }),
        },
      );

      return await response.json();
    } catch (error) {
      return rejectWithValue('Произошла ошибка создания заказа, пожалуйста, повторите попытку снова');
    }
  },
);

export default createOrder;
