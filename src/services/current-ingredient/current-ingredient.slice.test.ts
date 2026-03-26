import reducer, {
  setCurrentIngredient,
  clearCurrentIngredient,
} from './current-ingredient.slice';
import { ICurrentIngredientState, IIngredient, IngredientType } from '../../types';

const initialState: ICurrentIngredientState = {
  ingredient: null,
};

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

describe('currentIngredient reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setCurrentIngredient', () => {
    const state = reducer(initialState, setCurrentIngredient(ingredient));

    expect(state.ingredient).toEqual(ingredient);
  });

  it('should replace current ingredient with a new one', () => {
    const stateWithIngredient: ICurrentIngredientState = {
      ingredient,
    };
    const newIngredient: IIngredient = { ...ingredient, _id: '2', name: 'Соус Spicy-X' };

    const state = reducer(stateWithIngredient, setCurrentIngredient(newIngredient));

    expect(state.ingredient).toEqual(newIngredient);
  });

  it('should handle clearCurrentIngredient', () => {
    const stateWithIngredient: ICurrentIngredientState = {
      ingredient,
    };

    const state = reducer(stateWithIngredient, clearCurrentIngredient());

    expect(state.ingredient).toBeNull();
  });

  it('should handle clearCurrentIngredient when already null', () => {
    const state = reducer(initialState, clearCurrentIngredient());

    expect(state.ingredient).toBeNull();
  });
});
