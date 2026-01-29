import { createSlice } from '@reduxjs/toolkit';
import fetchIngredients from './burger-ingredients.thunks';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.items = [];
      });
  },
});

export default burgerIngredientsSlice.reducer;
