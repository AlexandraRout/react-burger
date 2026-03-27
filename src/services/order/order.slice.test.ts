import reducer, { updateTotalPrice, initialState } from './order.slice';
import { createOrder } from './order.thunks';
import { IOrderState } from '../../types';
import { mockOrderApiResponse as orderResponse } from '../../shared/mocks/order-mock';
import { unknownError } from '../../shared/unknown-error';

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle updateTotalPrice', () => {
    const state = reducer(initialState, updateTotalPrice(2510));

    expect(state.totalPrice).toBe(2510);
  });

  it('should handle updateTotalPrice to zero', () => {
    const stateWithPrice: IOrderState = { ...initialState, totalPrice: 2510 };

    const state = reducer(stateWithPrice, updateTotalPrice(0));

    expect(state.totalPrice).toBe(0);
  });

  it('should handle createOrder.pending', () => {
    const state = reducer(initialState, createOrder.pending('', []));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should clear error on pending', () => {
    const stateWithError: IOrderState = { ...initialState, error: 'Ошибка' };

    const state = reducer(stateWithError, createOrder.pending('', []));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle createOrder.fulfilled', () => {
    const loadingState: IOrderState = { ...initialState, isLoading: true };

    const state = reducer(
      loadingState,
      createOrder.fulfilled(orderResponse, '', []),
    );

    expect(state.isLoading).toBe(false);
    expect(state.orderId).toBe(12345);
  });

  it('should handle createOrder.rejected', () => {
    const loadingState: IOrderState = { ...initialState, isLoading: true };

    const state = reducer(
      loadingState,
      createOrder.rejected(null, '', [], 'Произошла ошибка создания заказа, пожалуйста, повторите попытку снова'),
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Произошла ошибка создания заказа, пожалуйста, повторите попытку снова');
    expect(state.orderId).toBeNull();
  });

  it('should clear orderId on rejected', () => {
    const stateWithOrder: IOrderState = { ...initialState, orderId: 12345, isLoading: true };

    const state = reducer(
      stateWithOrder,
      createOrder.rejected(null, '', [], 'Ошибка'),
    );

    expect(state.orderId).toBeNull();
  });

  it('should set default error when rejected without rejectValue', () => {
    const loadingState: IOrderState = { ...initialState, isLoading: true };

    const state = reducer(
      loadingState,
      createOrder.rejected(null, '', []),
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(unknownError);
  });
});
