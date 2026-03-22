import { createSlice } from '@reduxjs/toolkit';
import { IOrder } from '../../types';
import fetchOrderByNumber from './order-details.thunks';

interface IOrderDetailsState {
  order: IOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IOrderDetailsState = {
  order: null,
  isLoading: false,
  error: null,
};

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки заказа';
      });
  },
});

export const { clearOrder } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
