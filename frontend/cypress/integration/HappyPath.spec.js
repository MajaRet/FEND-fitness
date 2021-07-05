describe('HappyPath', () => {
  it('should walk the happy path', () => {
    cy.visit('/');

    cy.findByText(/Dein Workout heute/i);

    cy.findByText(/browse/i).click();
    cy.url().should('include', '/browse');
  });
});
