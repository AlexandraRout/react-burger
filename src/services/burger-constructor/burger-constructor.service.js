import { nanoid } from '@reduxjs/toolkit';

export const addIngredient = (ingredients, item) => {
  const ingredient = { ...item, uuid: nanoid() };

  if (ingredient.type === 'bun') {
    return [
      ...ingredients.filter((i) => i.type !== 'bun'),
      ingredient,
      ingredient,
    ];
  }

  return [...ingredients, ingredient];
};

export const removeIngredient = (ingredients, uuid) => ingredients
  .filter((item) => item.uuid !== uuid);

export const moveIngredient = (ingredients, from, to) => {
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
