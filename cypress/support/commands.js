Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Daniele')
    cy.get('#lastName').type('Lopes')
    cy.get('#email').type('d.santoslopes@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})