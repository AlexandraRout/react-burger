import { nanoid } from '@reduxjs/toolkit';
import { IIngredient, IIngredientWithUUID } from '../../types';

export const addIngredient = (ingredients: IIngredientWithUUID[], item: IIngredient): IIngredientWithUUID[] => {
  const ingredient: IIngredientWithUUID = { ...item, uuid: nanoid() };

  if (ingredient.type === 'bun') {
    return [
      ...ingredients.filter((i) => i.type !== 'bun'),
      ingredient,
      ingredient,
    ];
  }

  return [...ingredients, ingredient];
};

export const removeIngredient = (ingredients: IIngredientWithUUID[], uuid: string): IIngredientWithUUID[] => ingredients
  .filter((item) => item.uuid !== uuid);

export const moveIngredient = (ingredients: IIngredientWithUUID[], from: number, to: number): IIngredientWithUUID[] => {
  const buns = ingredients.filter((i) => i.type === 'bun');
  const fillings = ingredients.filter((i) => i.type !== 'bun');

  if (
    from < 0
        || to < 0
        || from >= fillings.length
        || to >= fillings.length
  ) {
    return ingredients;
  }

  const newFillings = [...fillings];
  const [moved] = newFillings.splice(from, 1);
  newFillings.splice(to, 0, moved);

  return [...buns, ...newFillings];
};
