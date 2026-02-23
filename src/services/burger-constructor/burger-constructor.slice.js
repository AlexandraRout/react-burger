import { createSlice } from '@reduxjs/toolkit';
import { addIngredient, moveIngredient, removeIngredient } from './burger-constructor.service';

const initialState = {
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredientToConstructor(state, action) {
      state.ingredients = addIngredient(state.ingredients, action.payload);
    },
    removeIngredientFromConstructor(state, action) {
      state.ingredients = removeIngredient(state.ingredients, action.payload);
    },
    moveIngredientInConstructor(state, action) {
      const { from, to } = action.payload;
      state.ingredients = moveIngredient(state.ingredients, from, to);
    },
    removeAllIngredientsFromConstructor(state) {
      state.ingredients = initialState.ingredients;
    },
  },
});

export const {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  moveIngredientInConstructor,
  removeAllIngredientsFromConstructor,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
