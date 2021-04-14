/// <reference types="Cypress" />

describe('<Form /> component', () => {
  beforeEach(() => {
    cy.request('http://localhost:4000/prune-database');
    cy.visit('/add');
  });

  it('should fill in the form properly', () => {
    const member = {
      firstName: 'William',
      lastName: 'Shakespeare',
      description: 'Author',
    };

    cy.get('[data-testid="first-name-input"]').type(member.firstName);
    cy.get('[data-testid="last-name-input"]').type(member.lastName);
    cy.get('[data-testid="description-input"]').type(member.description);
    cy.get('[data-testid="add-group"]').click({ force: true });
    cy.get('[data-testid="input-new-group"]').type('WS Verlag');
    cy.get('[data-testid="button-new-group"]').click();
    cy.get('[data-testid="form-submit-button"]').click();
  });
});
