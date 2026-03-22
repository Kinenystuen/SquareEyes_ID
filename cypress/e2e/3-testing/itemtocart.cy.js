describe("E-commerce Application - Product Fetching", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", () => false);

    cy.intercept("GET", "**/square-eyes").as("fetchProducts");
    cy.visit("/movie-pages/all-movies.html");
    cy.wait("@fetchProducts");
  });

  it("should fetch and display products from the API, find Godzilla, and add it to the shopping bag", () => {
    cy.contains(".movie_card h2", "Godzilla", { timeout: 10000 })
      .closest(".movie_card")
      .within(() => {
        cy.get(".shopping_bag_button", { timeout: 10000 })
          .should("be.visible")
          .click();
      });

    cy.contains(".movie_card h2", "Godzilla")
      .closest(".movie_card")
      .within(() => {
        cy.get(".shopping_bag_button.yellow", { timeout: 10000 }).should(
          "exist"
        );
      });
  });

it('should find Mandalorian, add it to the shopping bag, then go to checkout page', () => {
  cy.contains('.movie_card h2', 'Mandalorian', { timeout: 10000 })
    .closest('.movie_card')
    .within(() => {
      cy.get('.shopping_bag_button', { timeout: 10000 })
        .should('be.visible')
        .click();
    });

  cy.get('a[aria-label="Go to shopping bag"]')
    .scrollIntoView()
    .click({ force: true });

  cy.url().should('include', '/checkout');
});

  it("should show the Pay now link or button on checkout page", () => {
    cy.visit("/checkout.html");
    cy.contains("a, button", "Pay now", { timeout: 10000 }).should(
      "be.visible"
    );
  });
});
