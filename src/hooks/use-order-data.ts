import { useAppSelector } from '../types/typed-redux-hooks';
import { IIngredient, IOrder } from '../types';

interface IOrderData {
  order: IOrder;
  uniqueIngredients: { ingredient: IIngredient; count: number }[];
  totalPrice: number;
}

export default function useOrderData(
  id: string | undefined,
): IOrderData | null {
  const feedOrders = useAppSelector((state) => state.ordersFeed.orders);
  const userOrders = useAppSelector((state) => state.userOrders.orders);
  const detailsOrder = useAppSelector((state) => state.orderDetails.order);
  const allIngredients = useAppSelector((state) => state.burgerIngredients.items);

  const order = feedOrders.find((feedOrder) => feedOrder.number.toString() === id)
    ?? userOrders.find((feedOrder) => feedOrder.number.toString() === id)
    ?? (detailsOrder && detailsOrder.number.toString() === id ? detailsOrder : null);

  if (!order) return null;

  const countMap = new Map<string, number>();
  order.ingredients.forEach((ingredientId) => {
    countMap.set(ingredientId, (countMap.get(ingredientId) ?? 0) + 1);
  });

  const uniqueIngredients: IOrderData['uniqueIngredients'] = [];
  countMap.forEach((count, ingredientId) => {
    const found = allIngredients.find((ingredient) => ingredient._id === ingredientId);
    if (found) {
      uniqueIngredients.push({ ingredient: found, count });
    }
  });

  const totalPrice = uniqueIngredients.reduce(
    (sum, { ingredient, count }) => sum + ingredient.price * count,
    0,
  );

  return { order, uniqueIngredients, totalPrice };
}
