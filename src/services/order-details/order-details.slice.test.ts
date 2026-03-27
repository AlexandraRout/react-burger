import reducer, { clearOrder, initialState, IOrderDetailsState } from './order-details.slice';
import fetchOrderByNumber from './order-details.thunks';
import { mockOrder as order } from '../../shared/mocks/order-mock';

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
