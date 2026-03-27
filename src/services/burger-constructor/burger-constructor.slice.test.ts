import reducer, {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  moveIngredientInConstructor,
  removeAllIngredientsFromConstructor,
  initialState,
} from './burger-constructor.slice';
import {
  IBurgerConstructorState, IIngredient, IIngredientWithUUID, IngredientType,
} from '../../types';
import { mockBun as bun, mockSauce as sauce, mockMain as main } from '../../shared/mocks/ingredients-mock';

jest.mock('@reduxjs/toolkit', () => {
  const actual = jest.requireActual('@reduxjs/toolkit');
  let counter = 0;
  return {
    ...actual,
    nanoid: () => {
      const id = `test-uuid-${counter}`;
      counter += 1;
      return id;
    },
  };
});

describe('burgerConstructor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addIngredientToConstructor for a filling', () => {
    const state = reducer(initialState, addIngredientToConstructor(sauce));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(expect.objectContaining({
      _id: '2',
      name: 'Соус Spicy-X',
      type: IngredientType.Sauce,
    }));
    expect(state.ingredients[0].uuid).toBeDefined();
  });

  it('should append fillings to existing ingredients', () => {
    const fillingWithUuid: IIngredientWithUUID = { ...sauce, uuid: 'existing-uuid' };
    const stateWithFilling: IBurgerConstructorState = {
      ingredients: [fillingWithUuid],
    };

    const state = reducer(stateWithFilling, addIngredientToConstructor(main));

    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients[0]._id).toBe('2');
    expect(state.ingredients[1]._id).toBe('3');
  });

  it('should handle addIngredientToConstructor for a bun (adds two, replaces previous bun)', () => {
    const state = reducer(initialState, addIngredientToConstructor(bun));

    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients[0].type).toBe(IngredientType.Bun);
    expect(state.ingredients[1].type).toBe(IngredientType.Bun);
  });

  it('should replace existing bun when adding a new bun', () => {
    const oldBun: IIngredientWithUUID = { ...bun, uuid: 'old-bun-uuid', name: 'Old bun' };
    const stateWithBun: IBurgerConstructorState = {
      ingredients: [oldBun, oldBun],
    };

    const newBun: IIngredient = { ...bun, _id: '10', name: 'New bun' };
    const state = reducer(stateWithBun, addIngredientToConstructor(newBun));

    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients[0].name).toBe('New bun');
    expect(state.ingredients[1].name).toBe('New bun');
  });

  it('should keep fillings when replacing bun', () => {
    const fillingWithUuid: IIngredientWithUUID = { ...sauce, uuid: 'filling-uuid' };
    const oldBun: IIngredientWithUUID = { ...bun, uuid: 'old-bun-uuid' };
    const stateWithBunAndFilling: IBurgerConstructorState = {
      ingredients: [oldBun, oldBun, fillingWithUuid],
    };

    const newBun: IIngredient = { ...bun, _id: '10', name: 'New bun' };
    const state = reducer(stateWithBunAndFilling, addIngredientToConstructor(newBun));

    expect(state.ingredients).toHaveLength(3);
    const fillings = state.ingredients.filter((i) => i.type !== IngredientType.Bun);
    expect(fillings).toHaveLength(1);
    expect(fillings[0]._id).toBe('2');
  });

  it('should handle removeIngredientFromConstructor', () => {
    const filling: IIngredientWithUUID = { ...sauce, uuid: 'uuid-to-remove' };
    const stateWithFilling: IBurgerConstructorState = {
      ingredients: [filling],
    };

    const state = reducer(stateWithFilling, removeIngredientFromConstructor('uuid-to-remove'));

    expect(state.ingredients).toHaveLength(0);
  });

  it('should only remove ingredient with matching uuid', () => {
    const filling1: IIngredientWithUUID = { ...sauce, uuid: 'uuid-1' };
    const filling2: IIngredientWithUUID = { ...main, uuid: 'uuid-2' };
    const stateWithFillings: IBurgerConstructorState = {
      ingredients: [filling1, filling2],
    };

    const state = reducer(stateWithFillings, removeIngredientFromConstructor('uuid-1'));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].uuid).toBe('uuid-2');
  });

  it('should handle moveIngredientInConstructor', () => {
    const filling1: IIngredientWithUUID = { ...sauce, uuid: 'uuid-1' };
    const filling2: IIngredientWithUUID = { ...main, uuid: 'uuid-2' };
    const stateWithFillings: IBurgerConstructorState = {
      ingredients: [filling1, filling2],
    };

    const state = reducer(stateWithFillings, moveIngredientInConstructor({ from: 0, to: 1 }));

    expect(state.ingredients[0].uuid).toBe('uuid-2');
    expect(state.ingredients[1].uuid).toBe('uuid-1');
  });

  it('should not move buns, only fillings', () => {
    const bunWithUuid: IIngredientWithUUID = { ...bun, uuid: 'bun-uuid' };
    const filling1: IIngredientWithUUID = { ...sauce, uuid: 'uuid-1' };
    const filling2: IIngredientWithUUID = { ...main, uuid: 'uuid-2' };
    const stateWithAll: IBurgerConstructorState = {
      ingredients: [bunWithUuid, filling1, filling2],
    };

    const state = reducer(stateWithAll, moveIngredientInConstructor({ from: 0, to: 1 }));

    const buns = state.ingredients.filter((i) => i.type === IngredientType.Bun);
    const fillings = state.ingredients.filter((i) => i.type !== IngredientType.Bun);
    expect(buns).toHaveLength(1);
    expect(fillings[0].uuid).toBe('uuid-2');
    expect(fillings[1].uuid).toBe('uuid-1');
  });

  it('should return same state for invalid move indices', () => {
    const filling1: IIngredientWithUUID = { ...sauce, uuid: 'uuid-1' };
    const stateWithFilling: IBurgerConstructorState = {
      ingredients: [filling1],
    };

    const state = reducer(stateWithFilling, moveIngredientInConstructor({ from: 0, to: 5 }));

    expect(state.ingredients).toEqual(stateWithFilling.ingredients);
  });

  it('should handle removeAllIngredientsFromConstructor', () => {
    const filling1: IIngredientWithUUID = { ...sauce, uuid: 'uuid-1' };
    const filling2: IIngredientWithUUID = { ...main, uuid: 'uuid-2' };
    const bunWithUuid: IIngredientWithUUID = { ...bun, uuid: 'bun-uuid' };
    const stateWithAll: IBurgerConstructorState = {
      ingredients: [bunWithUuid, bunWithUuid, filling1, filling2],
    };

    const state = reducer(stateWithAll, removeAllIngredientsFromConstructor());

    expect(state).toEqual(initialState);
  });
});
