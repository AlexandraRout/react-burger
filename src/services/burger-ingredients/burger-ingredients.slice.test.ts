import reducer, { initialState } from './burger-ingredients.slice';
import fetchIngredients from './burger-ingredients.thunks';
import { IBurgerIngredientsState, IIngredient, IngredientType } from '../../types';

const ingredient: IIngredient = {
  _id: '1',
  name: 'Краторная булка N-200i',
  type: IngredientType.Bun,
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
};

const errorMessage = 'Ошибка загрузки ингредиентов';

describe('burgerIngredients reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const state = reducer(initialState, fetchIngredients.pending(''));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should clear error on pending', () => {
    const stateWithError: IBurgerIngredientsState = {
      items: [],
      isLoading: false,
      error: errorMessage,
    };

    const state = reducer(stateWithError, fetchIngredients.pending(''));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const loadingState: IBurgerIngredientsState = {
      items: [],
      isLoading: true,
      error: null,
    };
    const ingredients: IIngredient[] = [ingredient];

    const state = reducer(
      loadingState,
      fetchIngredients.fulfilled(ingredients, ''),
    );

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(ingredients);
  });

  it('should handle fetchIngredients.rejected', () => {
    const loadingState: IBurgerIngredientsState = {
      items: [],
      isLoading: true,
      error: null,
    };

    const state = reducer(
      loadingState,
      fetchIngredients.rejected(null, '', undefined, errorMessage),
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.items).toEqual([]);
  });

  it('should clear items on rejected', () => {
    const stateWithItems: IBurgerIngredientsState = {
      items: [ingredient],
      isLoading: true,
      error: null,
    };

    const state = reducer(
      stateWithItems,
      fetchIngredients.rejected(null, '', undefined, 'Ошибка'),
    );

    expect(state.items).toEqual([]);
  });

  it('should set default error when rejected without rejectValue', () => {
    const loadingState: IBurgerIngredientsState = {
      items: [],
      isLoading: true,
      error: null,
    };

    const state = reducer(
      loadingState,
      fetchIngredients.rejected(null, ''),
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Произошла неизвестная ошибка');
  });
});
