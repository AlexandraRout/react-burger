import { IOrder } from '../types';

const mockOrders: IOrder[] = [
  {
    _id: '1',
    number: 34536,
    name: 'Nebula Cosmic Shake сет',
    status: 'done',
    ingredients: [
      '643d69a5c3f7b9001cfa093c', // Краторная булка N-200i
      '643d69a5c3f7b9001cfa0941', // Биокотлета из марсианской Магнолии
      '643d69a5c3f7b9001cfa0942', // Соус Spicy-X
      '643d69a5c3f7b9001cfa0946', // Хрустящие минеральные кольца
      '643d69a5c3f7b9001cfa093c', // Краторная булка N-200i (повтор)
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    number: 34535,
    name: 'Space Meat бургер',
    status: 'pending',
    ingredients: [
      '643d69a5c3f7b9001cfa093d', // Флюоресцентная булка R2-D3
      '643d69a5c3f7b9001cfa093f', // Мясо бессмертных моллюсков Protostomia
      '643d69a5c3f7b9001cfa0940', // Говяжий метеорит (отбивная)
      '643d69a5c3f7b9001cfa0943', // Соус фирменный Space Sauce
      '643d69a5c3f7b9001cfa0948', // Кристаллы марсианских альфа-сахаридов
      '643d69a5c3f7b9001cfa094a', // Сыр с астероидной плесенью
      '643d69a5c3f7b9001cfa093d', // Флюоресцентная булка R2-D3 (повтор)
    ],
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
    updatedAt: new Date(Date.now() - 3600_000).toISOString(),
  },
  {
    _id: '3',
    number: 34534,
    name: 'Black Hole бургер',
    status: 'created',
    ingredients: [
      '643d69a5c3f7b9001cfa093c', // Краторная булка N-200i
      '643d69a5c3f7b9001cfa093e', // Филе Люминесцентного тетраодонтимформа
      '643d69a5c3f7b9001cfa0944', // Соус традиционный галактический
      '643d69a5c3f7b9001cfa0945', // Соус с шипами Антарианского плоскоходца
      '643d69a5c3f7b9001cfa0947', // Плоды Фалленианского дерева
      '643d69a5c3f7b9001cfa0949', // Мини-салат Экзо-Плантаго
      '643d69a5c3f7b9001cfa093c', // Краторная булка N-200i (повтор)
    ],
    createdAt: new Date(Date.now() - 86400_000).toISOString(),
    updatedAt: new Date(Date.now() - 86400_000).toISOString(),
  },
];

export default mockOrders;
