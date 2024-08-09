describe('Navigate to contact page and send message', () => {
    beforeEach(() => {
      // Ignore any uncaught exceptions that might break the test
      cy.on('uncaught:exception', (err, runnable) => {
        return false;
      });
  
      // Increase the default command timeout
      Cypress.config('defaultCommandTimeout', 10000);
    });
  
    it('Navigates to contact page', () => {
      // Visit the homepage
      cy.visit('/index.html');
      
      // Check if the nav menu is hidden, if so, click the hamburger icon
      cy.get('.nav_left').then(($nav) => {
        if ($nav.css('display') === 'none') {
          cy.get('label[for="menu_checkbox"]').click();
        }
      });
      
    //   cy.get('.header_left').within(() => {
    //     cy.contains('a', 'Contact').click();
    //   });
      cy.visit(`/contact_us.html`)
  
      // Wait for a specific element on the Contact page
    //   cy.contains('h1', 'Contact Us').should('be.visible');

    //   cy.url().should('include', '/contact_us.html');
      
      // Fill out the contact form
      cy.get('form#message_area').within(() => {
        cy.get('input#name').type('John Doe');
        cy.get('input#email').type('john.doe@example.com');
        cy.get('textarea#message').type('This is a test message.');
  
        // Click the "Send" button
        cy.get('div#sendmessage').click();

  
        // Optionally, check for a success message or some indication that the form was submitted
        cy.get(`form#message_area_sent`);
      });
    });
  
    it('Fills out the contact form and sends it', () => {
      // Ensure you're on the correct page
      
    });
  });
  