import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentIngredientState, IIngredient } from '../../types';

const initialState: ICurrentIngredientState = {
  ingredient: null,
};

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    setCurrentIngredient(state, action: PayloadAction<IIngredient | undefined>) {
      state.ingredient = action.payload ?? null;
    },
    clearCurrentIngredient(state) {
      state.ingredient = null;
    },
  },
});

export const {
  setCurrentIngredient,
  clearCurrentIngredient,
} = currentIngredientSlice.actions;

export default currentIngredientSlice.reducer;
