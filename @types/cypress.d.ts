declare namespace Cypress {
  interface Chainable {
    addIngredientToConstructor(cardIndex: number): Chainable<void>;
  }
}
