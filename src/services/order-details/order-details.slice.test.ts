import reducer, { clearOrder, initialState, IOrderDetailsState } from './order-details.slice';
import fetchOrderByNumber from './order-details.thunks';
import { IOrder, OrderStatus } from '../../types';

const order: IOrder = {
  _id: 'abc123',
  ingredients: ['id1', 'id2', 'id3'],
  status: OrderStatus.Done,
  name: 'Краторный бургер',
  number: 12345,
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:01:00.000Z',
};

describe('orderDetails reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle clearOrder', () => {
    const stateWithOrder: IOrderDetailsState = {
      order,
      isLoading: false,
      error: null,
    };

    const state = reducer(stateWithOrder, clearOrder());

    expect(state).toEqual(initialState);
  });

  it('should handle clearOrder when loading with error', () => {
    const stateWithError: IOrderDetailsState = {
      order: null,
      isLoading: true,
      error: 'Ошибка',
    };

    const state = reducer(stateWithError, clearOrder());

    expect(state).toEqual(initialState);
  });

  it('should handle fetchOrderByNumber.pending', () => {
    const state = reducer(initialState, fetchOrderByNumber.pending('', '12345'));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should clear error on pending', () => {
    const stateWithError: IOrderDetailsState = {
      order: null,
      isLoading: false,
      error: 'Ошибка загрузки заказа',
    };

    const state = reducer(stateWithError, fetchOrderByNumber.pending('', '12345'));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchOrderByNumber.fulfilled', () => {
    const loadingState: IOrderDetailsState = { ...initialState, isLoading: true };

    const state = reducer(
      loadingState,
      fetchOrderByNumber.fulfilled(order, '', '12345'),
    );

    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(order);
  });

  it('should handle fetchOrderByNumber.rejected', () => {
    const loadingState: IOrderDetailsState = { ...initialState, isLoading: true };
    const error = new Error('Ошибка загрузки заказа');

    const state = reducer(
      loadingState,
      fetchOrderByNumber.rejected(error, '', '12345'),
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки заказа');
  });

  it('should use default error message when rejected without explicit error', () => {
    const loadingState: IOrderDetailsState = { ...initialState, isLoading: true };

    const state = reducer(
      loadingState,
      fetchOrderByNumber.rejected(null, '', '12345'),
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Rejected');
  });
});
