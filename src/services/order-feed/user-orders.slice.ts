import createOrderFeedSlice from './create-order-feed-slice';

const userOrders = createOrderFeedSlice('userOrders');

export const {
  connect: userOrdersConnect,
  disconnect: userOrdersDisconnect,
} = userOrders.actions;
export const userOrdersActions = userOrders.actions;
export default userOrders.reducer;
