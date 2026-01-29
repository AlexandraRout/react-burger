import { createSelector } from '@reduxjs/toolkit';

export const selectBun = createSelector(
  (state) => state.burgerConstructor.ingredients,
  (ingredients) => ingredients.find((item) => item.type === 'bun') || null,
);

export const selectFillings = createSelector(
  (state) => state.burgerConstructor.ingredients,
  (ingredients) => ingredients.filter((item) => item.type !== 'bun'),
);
