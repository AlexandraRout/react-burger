import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createOrder } from './order.thunks';
import { IOrderState } from '../../types';

const initialState: IOrderState = {
  orderId: null,
  isLoading: false,
  error: null,
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.order.number;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.orderId = null;
      });
  },
});

export const { updateTotalPrice } = orderSlice.actions;
export default orderSlice.reducer;
