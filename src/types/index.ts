export interface IIngredient {
  _id: string;
  name: string;
  type: string;
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

export interface IOrderApiResponse {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
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
