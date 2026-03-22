import createWsSlice from '../ws/create-ws-slice';

const userOrders = createWsSlice('userOrders');

export const {
  connect: userOrdersConnect,
  disconnect: userOrdersDisconnect,
} = userOrders.actions;
export const userOrdersActionTypes = userOrders.actionTypes;
export default userOrders.reducer;
