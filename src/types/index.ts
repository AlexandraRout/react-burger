export enum IngredientType {
  Bun = 'bun',
  Sauce = 'sauce',
  Main = 'main',
}

export interface IIngredient {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IIngredientWithUUID extends IIngredient {
  uuid: string;
}

export interface IUser {
  name: string;
  email: string;
}

export interface IIngredientsApiResponse {
  success: boolean;
  data: IIngredient[];
}

export interface IAuthResponse {
  success: boolean;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export enum OrderStatus {
  Created = 'created',
  Pending = 'pending',
  Done = 'done',
}

export const OrderStatusText: Record<OrderStatus, string> = {
  [OrderStatus.Created]: 'Создан',
  [OrderStatus.Pending]: 'Готовится',
  [OrderStatus.Done]: 'Выполнен',
};

export interface IOrder {
  _id: string;
  ingredients: string[];
  status: OrderStatus;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderFeedMessage {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
  message?: string;
}

export interface IOrderFeedState {
  orders: IOrder[];
  total: number;
  totalToday: number;
  isConnected: boolean;
  error: string | null;
}

export interface IOrderApiResponse {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
}

export interface IOrderByNumberResponse {
  success: boolean;
  orders: IOrder[];
}

export interface ITokenRefreshResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IBurgerIngredientsState {
  items: IIngredient[];
  isLoading: boolean;
  error: string | null;
}

export interface IBurgerConstructorState {
  ingredients: IIngredientWithUUID[];
}

export interface ICurrentIngredientState {
  ingredient: IIngredient | null;
}

export interface IOrderState {
  orderId: number | null;
  isLoading: boolean;
  error: string | null;
  totalPrice: number;
}

export interface IUserState {
  user: IUser | null;
  email: string | null;
  isAuthChecked: boolean;
  forgotPasswordStep: boolean;
  isLoading: boolean;
  error: string | null;
}
