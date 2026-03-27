import reducer from './orders-feed.slice';
import createWsSlice, { initialState } from '../ws/create-ws-slice';
import { IOrder, IOrderFeedMessage, IOrderFeedState } from '../../types';
import { mockOrder as order } from '../../shared/mocks/order-mock';

const { actions } = createWsSlice('ordersFeed');

const message: IOrderFeedMessage = {
  success: true,
  orders: [order],
  total: 100,
  totalToday: 5,
};

describe('ordersFeed reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle onConnected', () => {
    const state = reducer(initialState, actions.onConnected());

    expect(state.isConnected).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should clear error on connected', () => {
    const stateWithError: IOrderFeedState = { ...initialState, error: 'Ошибка' };

    const state = reducer(stateWithError, actions.onConnected());

    expect(state.isConnected).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle onDisconnected', () => {
    const connectedState: IOrderFeedState = { ...initialState, isConnected: true };

    const state = reducer(connectedState, actions.onDisconnected());

    expect(state.isConnected).toBe(false);
  });

  it('should handle onMessageReceived with success', () => {
    const connectedState: IOrderFeedState = { ...initialState, isConnected: true };

    const state = reducer(connectedState, actions.onMessageReceived(message));

    expect(state.orders).toEqual([order]);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(5);
    expect(state.error).toBeNull();
  });

  it('should replace orders on new message', () => {
    const stateWithOrders: IOrderFeedState = {
      ...initialState,
      isConnected: true,
      orders: [order],
      total: 50,
      totalToday: 2,
    };
    const newOrder: IOrder = { ...order, _id: 'def456', number: 99999 };
    const newMessage: IOrderFeedMessage = {
      success: true,
      orders: [newOrder],
      total: 200,
      totalToday: 10,
    };

    const state = reducer(stateWithOrders, actions.onMessageReceived(newMessage));

    expect(state.orders).toEqual([newOrder]);
    expect(state.total).toBe(200);
    expect(state.totalToday).toBe(10);
  });

  it('should handle onMessageReceived with error', () => {
    const connectedState: IOrderFeedState = { ...initialState, isConnected: true };
    const errorMessage: IOrderFeedMessage = {
      success: false,
      orders: [],
      total: 0,
      totalToday: 0,
      message: 'Invalid token',
    };

    const state = reducer(connectedState, actions.onMessageReceived(errorMessage));

    expect(state.error).toBe('Invalid token');
    expect(state.orders).toEqual([]);
  });

  it('should use fallback error when message is undefined', () => {
    const connectedState: IOrderFeedState = { ...initialState, isConnected: true };
    const errorMessage: IOrderFeedMessage = {
      success: false,
      orders: [],
      total: 0,
      totalToday: 0,
    };

    const state = reducer(connectedState, actions.onMessageReceived(errorMessage));

    expect(state.error).toBe('Unknown error');
  });

  it('should handle onError', () => {
    const connectedState: IOrderFeedState = { ...initialState, isConnected: true };

    const state = reducer(connectedState, actions.onError('WebSocket error'));

    expect(state.isConnected).toBe(false);
    expect(state.error).toBe('WebSocket error');
  });
});
