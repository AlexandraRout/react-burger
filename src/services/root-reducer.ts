import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import burgerIngredientsReducer from './burger-ingredients/burger-ingredients.slice';
import burgerConstructorReducer from './burger-constructor/burger-constructor.slice';
import currentIngredientReducer from './current-ingredient/current-ingredient.slice';
import orderReducer from './order/order.slice';
import userSlice from './user/user.slice';
import ordersFeedReducer, { ordersFeedActionTypes } from './orders-feed/orders-feed.slice';
import userOrdersReducer, { userOrdersActionTypes } from './user-orders/user-orders.slice';
import orderDetailsReducer from './order-details/order-details.slice';
import { socketMiddleware } from './ws/websocket-middleware';

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  user: userSlice,
  ordersFeed: ordersFeedReducer,
  userOrders: userOrdersReducer,
  orderDetails: orderDetailsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
    .concat(socketMiddleware(ordersFeedActionTypes))
    .concat(socketMiddleware(userOrdersActionTypes)),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
