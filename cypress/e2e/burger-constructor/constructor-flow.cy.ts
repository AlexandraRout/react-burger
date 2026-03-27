// Точка отсечения desktop/mobile из CSS: burger-constructor-page.module.css
// .burger_constructor { display: none } при max-width: 1228px
interface IViewport { width: number; height: number }

const DESKTOP_VIEWPORT: IViewport = { width: 1440, height: 900 };
const MOBILE_VIEWPORT: IViewport = { width: 1000, height: 660 };

// Общий beforeEach: перехваты + visit

function setupPage() {
  cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
  cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
  cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');

  cy.visit('/', {
    onBeforeLoad(win) {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    },
  });

  cy.wait('@getIngredients');
  cy.wait('@getUser');
}

// Drag & Drop (desktop ≥ 1229px)

describe('Drag & Drop (desktop)', () => {
  beforeEach(() => {
    cy.viewport(DESKTOP_VIEWPORT.width, DESKTOP_VIEWPORT.height);
    setupPage();
  });

  it('добавляет булку в конструктор перетаскиванием', () => {
    cy.addIngredientToConstructor(0);
    cy.get('[data-cy="constructor-drop-area"]').should('contain', 'Краторная булка N-200i');
  });

  it('добавляет начинку в конструктор перетаскиванием', () => {
    cy.addIngredientToConstructor(0); // булка   (index 0: bun)
    cy.addIngredientToConstructor(2); // начинка (index 2: main — после bun и sauce)
    cy.get('[data-cy="constructor-drop-area"]').should('contain', 'Биокотлета из марсианской Магнолии');
  });
});

// Кнопка «Добавить» (mobile ≤ 1228px)

describe('Кнопка «Добавить» (mobile)', () => {
  beforeEach(() => {
    cy.viewport(MOBILE_VIEWPORT.width, MOBILE_VIEWPORT.height);
    setupPage();
  });

  it('добавляет булку кнопкой «Добавить»', () => {
    cy.addIngredientToConstructor(0);
    // На мобиле конструктор скрыт, проверяем счётчик на карточке
    cy.get('[data-cy="ingredient-card"]').eq(0).find('.counter').should('exist');
  });

  it('добавляет начинку кнопкой «Добавить»', () => {
    cy.addIngredientToConstructor(2); // index 2: main (после bun и sauce)
    cy.get('[data-cy="ingredient-card"]').eq(2).find('.counter').should('exist');
  });
});

// Модальное окно ингредиента

describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.viewport(DESKTOP_VIEWPORT.width, DESKTOP_VIEWPORT.height);
    setupPage();
  });

  it('открывает модальное окно при клике на ингредиент', () => {
    cy.get('[data-cy="ingredient-card"]').eq(0).click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').should('contain', 'Детали ингредиента');
  });

  it('отображает данные ингредиента в модальном окне', () => {
    cy.get('[data-cy="ingredient-card"]').eq(0).click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="modal"]').should('contain', '420'); // calories
    cy.get('[data-cy="modal"]').should('contain', '80'); // proteins
    cy.get('[data-cy="modal"]').should('contain', '24'); // fat
    cy.get('[data-cy="modal"]').should('contain', '53'); // carbohydrates
  });

  it('закрывает модальное окно кнопкой ✕', () => {
    cy.get('[data-cy="ingredient-card"]').eq(0).click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('закрывает модальное окно кликом на оверлей', () => {
    cy.get('[data-cy="ingredient-card"]').eq(0).click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('закрывает модальное окно клавишей Escape', () => {
    cy.get('[data-cy="ingredient-card"]').eq(0).click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});

// Создание заказа (desktop)

describe('Создание заказа (desktop)', () => {
  beforeEach(() => {
    cy.viewport(DESKTOP_VIEWPORT.width, DESKTOP_VIEWPORT.height);
    setupPage();
    // Подготовка: добавляем булку и начинку
    cy.addIngredientToConstructor(0);
    cy.addIngredientToConstructor(1);
  });

  it('оформляет заказ и показывает модальное окно с номером заказа', () => {
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="order-id"]').should('contain', '12345');
  });

  it('закрывает модальное окно заказа кнопкой ✕', () => {
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('закрывает модальное окно заказа кликом на оверлей', () => {
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('закрывает модальное окно заказа клавишей Escape', () => {
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
