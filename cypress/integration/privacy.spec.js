
Cypress._.times (15, function () {  //executa quantas vezes vc quiser o mesmo cenário, basta informar um valor
    it('CT21 testa a página da política de privacidade de forma independente', function() {
       cy.visit('./src/privacy.html')  
    
       cy.contains('Talking About Testing').should('be.visible')
    })
})