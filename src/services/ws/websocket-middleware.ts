import { type Middleware } from '@reduxjs/toolkit';

export type TWsActionTypes = {
  wsConnect: string;
  wsDisconnect: string;
  wsSendMessage: string;
  onOpen: string;
  onClose: string;
  onMessage: string;
  onError: string;
};

const reconnectDelay = 3000;

export function socketMiddleware(wsActions: TWsActionTypes): Middleware {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return (next) => (action: unknown) => {
      const { type, payload } = action as { type: string; payload?: unknown };

      if (type === wsActions.wsConnect) {
        if (socket !== null) return next(action);

        url = payload as string;
        socket = new WebSocket(url);
        isConnected = true;

        socket.onopen = () => {
          store.dispatch({ type: wsActions.onOpen });
        };
        socket.onclose = () => {
          store.dispatch({ type: wsActions.onClose });
          socket = null;
          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              store.dispatch({ type: wsActions.wsConnect, payload: url });
            }, reconnectDelay);
          }
        };
        socket.onmessage = (event) => {
          store.dispatch({ type: wsActions.onMessage, payload: JSON.parse(event.data) });
        };
        socket.onerror = () => {
          store.dispatch({ type: wsActions.onError, payload: 'WebSocket error' });
        };
      }

      if (type === wsActions.wsDisconnect) {
        socket?.close();
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket = null;
      }

      if (type === wsActions.wsSendMessage) {
        if (socket !== null && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(payload));
        }
      }

      return next(action);
    };
  };
}
