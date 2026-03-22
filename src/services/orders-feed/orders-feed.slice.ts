import createWsSlice from '../ws/create-ws-slice';

const ordersFeed = createWsSlice('ordersFeed');

export const { connect, disconnect } = ordersFeed.actions;
export const ordersFeedActionTypes = ordersFeed.actionTypes;
export default ordersFeed.reducer;
