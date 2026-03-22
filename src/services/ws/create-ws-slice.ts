import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderFeedMessage, IOrderFeedState } from '../../types';
import type { TWsActionTypes } from './websocket-middleware';

const initialState: IOrderFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isConnected: false,
  error: null,
};

export default function createWsSlice(name: string) {
  const actions = {
    connect: createAction<string>(`${name}/connect`),
    disconnect: createAction(`${name}/disconnect`),
    sendMessage: createAction<IOrderFeedMessage>(`${name}/sendMessage`),
    onConnected: createAction(`${name}/onConnected`),
    onDisconnected: createAction(`${name}/onDisconnected`),
    onMessageReceived: createAction<IOrderFeedMessage>(`${name}/onMessageReceived`),
    onError: createAction<string>(`${name}/onError`),
  };

  const actionTypes: TWsActionTypes = {
    wsConnect: actions.connect.type,
    wsDisconnect: actions.disconnect.type,
    wsSendMessage: actions.sendMessage.type,
    onOpen: actions.onConnected.type,
    onClose: actions.onDisconnected.type,
    onMessage: actions.onMessageReceived.type,
    onError: actions.onError.type,
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
          if (!action.payload.success) {
            state.error = action.payload.message ?? 'Unknown error';
            return;
          }
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
          state.error = null;
        })
        .addCase(actions.onError, (state, action: PayloadAction<string>) => {
          state.isConnected = false;
          state.error = action.payload;
        });
    },
  });

  return { actions, actionTypes, reducer: slice.reducer };
}
