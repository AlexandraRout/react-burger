import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import burgerIngredientsReducer from './burger-ingredients/burger-ingredients.slice';
import burgerConstructorReducer from './burger-constructor/burger-constructor.slice';
import currentIngredientReducer from './current-ingredient/current-ingredient.slice';
import orderReducer from './order/order.slice';
import userSlice from './user/user.slice';

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
