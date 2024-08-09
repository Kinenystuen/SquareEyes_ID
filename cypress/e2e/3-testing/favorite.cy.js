describe(`Movie site, adding movie to favorite and finding favorite movies`, () => {
  beforeEach(() => {
    // This will ignore any uncaught exceptions in the application code
    cy.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
  });
  it(`Go to movie page - favorite movie`, () => {
    cy.visit("/movie-pages/all-movies.html");
    cy.get(".movie_card")
      .contains("h2", "Hobbs & Shaw")
      .closest(".movie_card")
      .within(() => {
        // Find the "Add to cart" button and click it
        cy.get(".favoritesBagButton", { timeout: 10000 }).click();
      });
  });
  it("Navigate to the Favorites page", () => {
    cy.visit("/movie-pages/all-movies.html");
    // Find the nav_left navigation
    // Wait for the menu to become visible
    cy.get(".nav_left").then(($nav) => {
      if ($nav.css("display") === "none") {
        // If the nav is hidden, click the hamburger icon to reveal the menu
        cy.get('label[for="menu_checkbox"]').click();
      }
    });

    // Wait for the nav menu to become visible
    cy.get(".nav_left").should("be.visible");
    cy.get(".header_left").within(() => {
      // Find the "Favorites" link and click it
      cy.contains("a", "Favorites").click();
    });

    // Ensure we are on the Favorites page by checking the URL
    cy.url().should("include", "/your_fav.html");
  });
});
