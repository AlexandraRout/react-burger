import { IOrder, IOrderApiResponse, OrderStatus } from '../../types';

export const mockOrder: IOrder = {
  _id: 'abc123',
  ingredients: ['id1', 'id2'],
  status: OrderStatus.Done,
  name: 'Краторный бургер',
  number: 12345,
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:01:00.000Z',
};

export const mockOrderApiResponse: IOrderApiResponse = {
  success: true,
  name: 'Краторный бургер',
  order: { number: 12345 },
};
