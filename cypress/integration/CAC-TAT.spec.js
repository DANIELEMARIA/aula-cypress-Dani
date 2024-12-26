

/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000   //VARIAVEL PARA O TEMPO QUE VAI EXECUTAR TICK DO RELOGIO
    beforeEach(function() {
        
        cy.visit('./src/index.html')  
    })


    it('CT1 verifica o título da aplicação', function() {
        cy.title() .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })



    it('CT2 preenche os campos obrigatórios e envia o formulário', function() {
        cy.clock() // congela o relógio do navegador
        // (...) // ação que dispara algo que exibe uma mensagem por três segundos
       // (...) // verificação de que a mensagem está visível

        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'
        cy.get('#firstName').type('Daniele')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('d.santoslopes@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})   // define o tempo delay
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS) // avança o relógio três segundos (em milissegundos). Avanço este tempo para não perdê-lo esperando.
      
        // (...) // verificação de que a mensagem não está mais visível
        cy.get('.success').should('not.be.visible')
    })


    it('CT3 exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.clock()
        cy.get('#firstName').type('Daniele')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('d.santoslopes@gmail,com')
        cy.get('#open-text-area').type('Test')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('CT4 Campo de telefone continua vazio quando não é preenchido com nenhum valor', function() {
        cy.get('#firstName').type('Daniele')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('d.santoslopes@gmail,com')
        cy.get('#phone').type('abcdesdsdsdsd')
        .should('have.value', '')
        cy.get('#open-text-area').type('Test')
    })


    it('CT5 exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.clock()
        cy.get('#firstName').type('Daniele')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('d.santoslopes@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Test')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })


    it('CT6 preenche e limpa os campos nome, sobrenome, email e texto na area', function() {
        cy.get('#firstName')
          .type('Daniele')
          .should('have.value', 'Daniele')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Lopes')
          .should('have.value', 'Lopes')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('d.santoslopes@gmail.com')
          .should('have.value', 'd.santoslopes@gmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#open-text-area')
        .type('TesteQA')
        .should('have.value', 'TesteQA')        // verifica se tem este valor no campo
        .clear()                                // limpa o imput
        .should('have.value', '')               // verifica se o campo está vazio

    })


    it('CT7 exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })




    it('CT8 envia o formuário com sucesso usando um comando customizado', function() {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()    //comando para buscar no arquivo customizado dentro do arquivo commands.js
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
       
    })


    it('CT9 seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
        .select('youtube') // Seleção pelo value youtube
        .should('have.value', 'youtube')

    })


    it('CT10 seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
        .select('mentoria')    // Seleção pelo value Mentoria
        .should('have.value', 'mentoria')

    })


    it('CT11 seleciona um produto (Blog) por seu índice)', function() {
        cy.get('#product')
        .select(1)          // Seleção pelo índice 1    
        .should('have.value', 'blog')

    })


    it('CT12 marca o tipo de atendimento "Feedback")', function() {
       cy.get('input[type="radio"][value="feedback"]')
       .check()                // Selecionando um radio
       .should('have.value', 'feedback')

    })


    it('CT13 marca cada tipo de atendimento)', function() {
        cy.get('input[type="radio"]')
          .should('have.length', 3)        // selecionar cada opção do radio
          .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
 
    })


    it('CT14 marca ambos checkboxes, depois desmarca o último)', function() {
        cy.get('input[type="checkbox"]')       // marca todas as opções do checkbox e desmarcando a ultima opção
          .check()
          .last()
          .uncheck()
          .should('not.be.checked')
 
    })


    it('CT15 exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário)', function() {
        cy.clock()
        cy.get('#firstName').type('Daniele')
        cy.get('#lastName').type('Lopes')
        cy.get('#email').type('d.santoslopes@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Test')
        cy.contains('button', 'Enviar').click()
  
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
 
    })


    //3 tipos de inserir arquivo no imput

    it('CT16 seleciona um arquivo da pasta fixtures)', function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json')  //aqui vc passa a pasta e o nome do  arquivo que quer importar na tela
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
 
    })


    it('CT17 seleciona um arquivo simulando um drag-and-drop)', function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})   //aqui vc passa a pasta e o nome do  arquivo que quer importar na tela
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
 
    })


    it('CT18 seleciona um arquivo utilizando uma fixture para a qual foi dada um alias )', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
       
 
    })


      //Script de como abrir o link da pagina na mesma aba do cypress


    it('CT19 verifica que a política de privacidade abre em outra aba sem a necessidade de um clique)', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
 
    })

    it('CT20 acessa a página da política de privacidade removendo o target e então clicando no link)', function() {
        cy.get('#privacy a')
	      .invoke('removeAttr', 'target')
	      .click()
        
 
    })

    it('CT21 testa a página da política de privacidade de forma independente', function() {
        cy.get('#privacy a')
	      .invoke('removeAttr', 'target')
	      .click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })
      


    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })



    it('preenche a área de texto usando o comando .invoke', function() {
        const longText = Cypress._.repeat ('0123456789', 20)      //aqui vc digita 20 x a informação no imput

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })
})