describe('Navigate to contact page and send message', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    Cypress.config('defaultCommandTimeout', 10000);
  });

  it('loads the contact page and sends a message', () => {
    cy.visit('/contact_us.html');

    cy.get('form#message_area').should('exist').within(() => {
      cy.get('input#name').type('John Doe');
      cy.get('input#email').type('john.doe@example.com');
      cy.get('textarea#message').type('This is a test message.');
    });

    cy.get('div#sendmessage')
      .scrollIntoView()
      .should('be.visible')
      .click();

    cy.get('form#message_area_sent', { timeout: 10000 }).should('exist');
  });
});