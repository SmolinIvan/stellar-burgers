import mockIngredients from '../fixtures/ingredients.json';

const mockUser = {
  success: true,
  user: {
    email: 'ivan@ivanman.com',
    name: 'IvanIvan'
  }
};

const mockOrderData = {
  success: true,
  name: 'Краторный space люминесцентный бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0
      }
    ],
    _id: '6856b2f9943eac001cc3b08d',
    owner: {
      name: 'IvanIvan',
      email: 'ivan@ivanman.com',
      createdAt: '2025-05-13T19:48:29.785Z',
      updatedAt: '2025-05-13T19:48:29.785Z'
    },
    status: 'done',
    name: 'Краторный space люминесцентный бургер',
    createdAt: '2025-06-21T13:26:17.227Z',
    updatedAt: '2025-06-21T13:26:17.996Z',
    number: 82178,
    price: 3311
  }
};

const mockAccessToken = 'mock-access-token-123';

describe('Stellar burger', function () {
  beforeEach(() => {
    cy.setCookie('accessToken', mockAccessToken);

    cy.intercept('GET', 'api/ingredients', {
      statusCode: 200,
      body: { success: true, data: mockIngredients }
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
      statusCode: 200,
      body: mockUser
    }).as('getUser');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients').then((interception) => {
      if (!interception.response) {
        throw new Error('Response is undefined');
      }
      expect(interception.response.statusCode).to.eq(200);
    });
  });

  it('добавляет ингридиенты через data-cy', function () {
    cy.get(`[data-cy=${mockIngredients[0]._id}]`).within(() => {
      cy.contains('button', 'Добавить').click();
    });

    for (let i = 2; i < mockIngredients.length; i++) {
      cy.get(`[data-cy=${mockIngredients[i]._id}]`).within(() => {
        cy.contains('button', 'Добавить').click();
      });
    }

    const topBun = cy.get('.constructor-element_pos_top');
    topBun.contains(`${mockIngredients[0].name} (верх)`);
    const bottomBun = cy.get('.constructor-element_pos_bottom');
    bottomBun.contains(`${mockIngredients[0].name} (низ)`);
  });

  // такой поиск безопаснее и нет необходимости добавлять дополнительные теги в компонент
  it('добавляет ингридиенты через поиск по селекторам', function () {
    let addButtons: HTMLButtonElement[];
    cy.contains('Выберите булки', { timeout: 10000 }).should('be.visible');
    cy.get('button')
      .should(($buttons) => {
        addButtons = $buttons.toArray();
        console.log(addButtons);
        expect(addButtons).to.have.length(7);
      })
      .then((addButtons) => {
        for (let i = 2; i < addButtons.length - 1; i++) {
          cy.wrap(addButtons[i]).click();
        }
        cy.wrap(addButtons[0]).click();
      });

    cy.get('.constructor-element').then(($elements) => {
      cy.wrap($elements[1]).should('contain', mockIngredients[2].name);
      cy.wrap($elements[2]).should('contain', mockIngredients[3].name);
      cy.wrap($elements[3]).should('contain', mockIngredients[4].name);
    });
    const topBun = cy.get('.constructor-element_pos_top');
    topBun.contains(`${mockIngredients[0].name} (верх)`);
    const bottomBun = cy.get('.constructor-element_pos_bottom');
    bottomBun.contains(`${mockIngredients[0].name} (низ)`);
  });

  it('Открытие модального окна ингридиента', function () {
    const randomNumber = Math.floor(
      Math.random() * (mockIngredients.length - 1)
    );

    cy.get('#modals div').should('not.exist');
    cy.get('li')
      .contains(mockIngredients[randomNumber].name)
      .then(($element) => {
        cy.wrap($element).click();
      });

    cy.get('#modals div').should('exist');
    cy.get('#modals img').should(
      'have.attr',
      'src',
      mockIngredients[randomNumber].image_large
    );
    cy.get('#modals').contains(mockIngredients[randomNumber].name);
    cy.get('#modals').contains(mockIngredients[randomNumber].calories);
    cy.get('#modals').contains(mockIngredients[randomNumber].proteins);
    cy.get('#modals').contains(mockIngredients[randomNumber].carbohydrates);
    cy.get('#modals').contains(mockIngredients[randomNumber].fat);
  });

  it('Закрытие модального окна на крестик', function () {
    cy.get('#modals div').should('not.exist');
    const randomNumber = Math.floor(
      Math.random() * (mockIngredients.length - 1)
    );
    cy.get('a')
      .contains(mockIngredients[randomNumber].name)
      .then(($element) => {
        cy.wrap($element).click();
      });

    cy.get('#modals div').should('exist');

    cy.get('#modals button').click();
    cy.get('#modals div').should('not.exist');
  });

  it('Закрытие модального окна на оверлей', function () {
    cy.get('#modals div').should('not.exist');
    const randomNumber = Math.floor(
      Math.random() * (mockIngredients.length - 1)
    );
    cy.get('a')
      .contains(mockIngredients[randomNumber].name)
      .then(($element) => {
        cy.wrap($element).click();
      });

    cy.get('#modals div').should('exist');
    cy.get('body').click('topLeft');
    cy.get('#modals div').should('not.exist');
  });

  it('Создание заказа', function () {
    cy.intercept('POST', 'api/orders', {
      statusCode: 200,
      body: mockOrderData
    }).as('makeOrder');

    cy.contains('li', 'Краторная булка N-200i').find('button').click();
    cy.contains('li', 'Филе Люминесцентного тетраодонтимформа')
      .find('button')
      .click();
    cy.contains('li', 'Филе Люминесцентного тетраодонтимформа')
      .find('button')
      .click();
    cy.contains('li', 'Соус фирменный Space Sauce').find('button').click();
    cy.contains('Оформить заказ').click();
    cy.wait('@makeOrder').then((interception) => {
      if (!interception.response) {
        throw new Error('Response is undefined');
      }
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.get('#modals h2').contains(mockOrderData.order.number);
    cy.get('#modals button').click();
    cy.get('#modals h2').should('not.exist');

    cy.get('div').contains('Выберите булки');
    cy.get('div').contains('Выберите начинку');
  });
});
