describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.dropdown-toggle').click();
    cy.get('.dropdown-menu > :nth-child(1) > a').click();
    cy.get('#navbar > :nth-child(1) > :nth-child(2) > a').click();
    cy.get(':nth-child(1) > :nth-child(3) > a').click();
    /* ==== End Cypress Studio ==== */
  })
})