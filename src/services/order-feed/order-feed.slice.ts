import createOrderFeedSlice from './create-order-feed-slice';

const orderFeed = createOrderFeedSlice('orderFeed');

export const { connect, disconnect } = orderFeed.actions;
export const ordersFeedActions = orderFeed.actions;
export default orderFeed.reducer;
