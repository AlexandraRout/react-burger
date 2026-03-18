import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderFeedMessage, IOrderFeedState } from '../../types';

const initialState: IOrderFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isConnected: false,
  error: null,
};

export default function createOrderFeedSlice(name: string) {
  const actions = {
    connect: createAction<string>(`${name}/connect`),
    disconnect: createAction(`${name}/disconnect`),
    sendMessage: createAction<IOrderFeedMessage>(`${name}/sendMessage`),
    onConnected: createAction<Event>(`${name}/onConnected`),
    onDisconnected: createAction<CloseEvent>(`${name}/onDisconnected`),
    onMessageReceived: createAction<IOrderFeedMessage>(`${name}/onMessageReceived`),
    onError: createAction<Event>(`${name}/onError`),
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(actions.onConnected, (state) => {
          state.isConnected = true;
          state.error = null;
        })
        .addCase(actions.onDisconnected, (state) => {
          state.isConnected = false;
        })
        .addCase(actions.onMessageReceived, (state, action: PayloadAction<IOrderFeedMessage>) => {
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        })
        .addCase(actions.onError, (state) => {
          state.isConnected = false;
          state.error = 'WebSocket error';
        });
    },
  });

  return { actions, reducer: slice.reducer };
}
