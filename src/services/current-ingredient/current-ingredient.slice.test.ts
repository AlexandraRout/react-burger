import reducer, {
  setCurrentIngredient,
  clearCurrentIngredient,
  initialState,
} from './current-ingredient.slice';
import { ICurrentIngredientState, IIngredient } from '../../types';
import { mockBun as ingredient } from '../../shared/mocks/ingredients-mock';

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
