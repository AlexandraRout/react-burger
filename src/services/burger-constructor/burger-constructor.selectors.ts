import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';
import { IIngredientWithUUID } from '../../types';

export const selectBun = createSelector(
  (state: RootState) => state.burgerConstructor.ingredients,
  (ingredients): IIngredientWithUUID | null => ingredients.find((item) => item.type === 'bun') || null,
);

export const selectFillings = createSelector(
  (state: RootState) => state.burgerConstructor.ingredients,
  (ingredients): IIngredientWithUUID[] => ingredients.filter((item) => item.type !== 'bun'),
);
