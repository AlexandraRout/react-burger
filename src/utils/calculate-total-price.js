const calculateTotalPrice = (burgerIngredients) => burgerIngredients.reduce(
  (sum, item) => sum + item.price,
  0,
);

export default calculateTotalPrice;
