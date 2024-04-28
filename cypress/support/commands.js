Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Isadora')
    cy.get('#lastName').type('Ito')
    cy.get('#email').type('isadoraito@gmail.com')
    cy.get('#open-text-area').type('Text')
    
    cy.get('button[type="submit"]').click()
})