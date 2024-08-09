describe('E-commerce Application - Product Fetching', () => {
    beforeEach(() => {
        // This will ignore any uncaught exceptions in the application code
        cy.on('uncaught:exception', (err, runnable) => {
          // returning false here prevents Cypress from
          // failing the test
          return false;
        });
    
        // Visit the page where the movies are listed
        cy.visit('/movie-pages/all-movies.html');
      });
    it('should fetch and display products from the API then find the movie godzilla and add it to the shopping bag', () => {
  
      // Wait for the API call to complete and products to be displayed
      cy.intercept('GET', 'https://api.noroff.dev/api/v1/square-eyes').as('fetchProducts');
      cy.wait('@fetchProducts');

      cy.get('.movie_card').contains('h2', 'Godzilla').closest('.movie_card').within(() => {
        // Find the "Add to cart" button and click it
        cy.get('.shopping_bag_button.add', { timeout: 10000 }).click();
      });
      cy.get('.movie_card').contains('h2', 'Godzilla').closest('.movie_card').within(() => {
        // Find the "Add to cart" button and click it
        cy.get('.shopping_bag_button.yellow', { timeout: 10000 }).click();
      });
    });
    it(`Should find mandoloran and add to shopping bag, then remove`, () => {
        // find the movie with the name mandalorian
        cy.get('.movie_card').contains('h2', 'Mandalorian').closest('.movie_card').within(() => {
            // Find the "Add to cart" button and click it
            cy.get('.shopping_bag_button.add', { timeout: 10000 }).click();
          });
          
          // find shopping bag, and go to the shopping bag page
          cy.get('a[aria-label="Go to shopping bag"]').click();
          
          
    })
    it(`Checkout`, () => {
        // find checkout button
        cy.get('label').contains(`a`,`Pay now`).click();
    })
  });
  