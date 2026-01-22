import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  ingredients: [],
};

const burgerSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action) {
        const ingredient = action.payload;

        if (ingredient.type === 'bun') {
          // Удаляем старую булочку, если она была
          state.ingredients = state.ingredients.filter((i) => i.type !== 'bun');
          // Добавляем новую булочку дважды (нижняя, вырхняя)
          state.ingredients.push(ingredient, ingredient);
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare(item) {
        return { payload: { ...item, uuid: nanoid() } };
      },

    },
    removeIngredient: (state, action) => {
      const uuid = action.payload;
      state.ingredients = state.ingredients.filter((item) => item.uuid !== uuid);
    },
    moveIngredient(state, action) {
      const { from, to } = action.payload;
      const fillings = state.ingredients.filter((item) => item.type !== 'bun');

      if (
        from < 0
              || to < 0
              || from >= fillings.length
              || to >= fillings.length
      ) {
        return;
      }

      const [movedItem] = fillings.splice(from, 1);
      fillings.splice(to, 0, movedItem);

      let fillingIndex = 0;
      state.ingredients = state.ingredients.map((item) => {
        if (item.type === 'bun') return item;
        const result = fillings[fillingIndex];
        fillingIndex += 1;
        return result;
      });
    },
  },

});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
} = burgerSlice.actions;
export default burgerSlice.reducer;
