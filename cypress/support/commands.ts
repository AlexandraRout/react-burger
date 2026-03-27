/**
 * Добавляет ингредиент в конструктор, выбирая механику в зависимости от viewport:
 * - ≥ 1229px (desktop): drag-and-drop на [data-cy="constructor-drop-area"]
 * - < 1229px (mobile):  клик по кнопке «Добавить» внутри карточки
 *
 * @param cardIndex — индекс карточки среди [data-cy="ingredient-card"]
 */
Cypress.Commands.add('addIngredientToConstructor', (cardIndex: number) => {
  cy.get('[data-cy="ingredient-card"]').eq(cardIndex).then(($card) => {
    if (Cypress.config('viewportWidth') >= 1229) {
      const dataTransfer = new DataTransfer();
      cy.wrap($card).trigger('dragstart', { dataTransfer, force: true });
      cy.get('[data-cy="constructor-drop-area"]').trigger('dragenter', { dataTransfer, force: true });
      cy.get('[data-cy="constructor-drop-area"]').trigger('dragover', { dataTransfer, force: true });
      cy.get('[data-cy="constructor-drop-area"]').trigger('drop', { dataTransfer, force: true });
      cy.wrap($card).trigger('dragend', { force: true });
    } else {
      cy.wrap($card).contains('button', 'Добавить').click();
    }
  });
});
