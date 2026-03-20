import createWsSlice from '../ws/create-ws-slice';

const ordersFeed = createWsSlice('ordersFeed');

export const { connect, disconnect } = ordersFeed.actions;
export const ordersFeedActions = ordersFeed.actions;
export default ordersFeed.reducer;
