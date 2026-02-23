import { IIngredient } from '../types';

const calculateTotalPrice = (burgerIngredients: IIngredient[]): number => burgerIngredients.reduce(
  (sum, item) => sum + item.price,
  0,
);

export default calculateTotalPrice;
