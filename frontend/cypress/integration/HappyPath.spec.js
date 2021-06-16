describe("HappyPath", () => {
  it("should walk the happy path", () => {
    cy.visit("/");

    cy.findByText(/Dein Workout heute/i);

    cy.findByText(/browse/i).click();
    cy.url().should("include", "/browse");

    cy.findByText(/Großmutter, wieso hast du so große Muskeln?/i).click();
    cy.findAllByText(/7 Wochen/i).should("have.length", 3);
  });
});
