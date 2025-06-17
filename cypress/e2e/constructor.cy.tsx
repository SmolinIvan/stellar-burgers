import mockIngredients from '../fixtures/ingredients.json'

describe('Stellar burger', function() {
    before(() => {
    // Задаем мок-данные для API
    // Перехватываем запрос и подменяем ответ
    cy.intercept('GET', 'api/ingredients', {
      statusCode: 200,
      body: { success: true, data: mockIngredients }
    }).as('getIngredients');
  });


    it('сервис должен быть доступен по адресу localhost:5173', function() {
        cy.visit('http://localhost:4000'); 
        cy.wait('@getIngredients').then((interception) => {
          if (!interception.response) {
            throw new Error('Response is undefined');
          }
          expect(interception.response.statusCode).to.eq(200);
        });
    });
}); 