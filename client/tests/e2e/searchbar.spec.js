/// <reference types="Cypress" />

describe('<Searchbar/> component', () => {
  const SEARCHBAR_INPUT = '[data-testid="searchbar-input"]';
  const GROUPFILTER_SELECT = '[data-testid="groupfilter-select"]';

  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the search input and filter select field', () => {
    cy.get(SEARCHBAR_INPUT).should('be.visible');
    cy.get(GROUPFILTER_SELECT).should('be.visible');
  });

  it('shows the search query value in the search input field', () => {
    cy.get(SEARCHBAR_INPUT).type('ben');
    cy.get(SEARCHBAR_INPUT).should('have.value', 'ben');
  });

  it('renders all members that contain the search query value', () => {
    cy.get(SEARCHBAR_INPUT).type('Käp');
    cy.get('[data-testid="details-link"]').click();
    cy.get('[data-testid="member-details"]').contains('Käp');
  });

  it('only renders members that are part of the selected group', () => {
    cy.get(GROUPFILTER_SELECT).select('Reederei Blaubär');
    cy.get('[data-testid="group-headline"]').contains('Reederei Blaubär');
  });

  it('only renders members that contain search query AND are part of the selected group', () => {
    cy.get(GROUPFILTER_SELECT).select('Reederei Blaubär');
    cy.get(SEARCHBAR_INPUT).type('Käp');
    cy.get('[data-testid="details-link"]').click();
    cy.get('[data-testid="member-details"]').contains('Käp');
    cy.get('[data-testid="member-details"]').contains('Reederei Blaubär');
  });
});
