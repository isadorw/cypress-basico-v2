/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    // minha versão do exercício 
    // it('preenche os campos obrigatórios e envia o formulário', function() {
    //     cy.get('input[name="firstName"]')
    //         .should('be.visible')
    //         .type('Isadora')
    //         .should('have.value', 'Isadora')
    //     cy.get('input[name="lastName"]')
    //         .should('be.visible')
    //         .type('Ito')
    //         .should('have.value', 'Ito')
    //     cy.get('[type="email"]')
    //         .should('be.visible')
    //         .type('isadoraito@gmail.com')
    //         .should('have.value', 'isadoraito@gmail.com')
    //     cy.get('textarea')
    //         .should('be.visible')
    //         .type('Quero pedir reembolso')
    //         .should('have.value', 'Quero pedir reembolso')
    //     cy.get('button').click()
    //     cy.get('.success').should('be.visible')
    // })

    Cypress._.times(3, function() {
        it('preenche os campos obrigatórios e envia o formulário', function() {
            
                const customer = {
                    firstName: "Isadora",
                    lastName: "Ito",
                    email: "isadoraito@gmail.com"
                }
                
                cy.clock()
                cy.fillMandatoryFieldsAndSubmit(customer)
                cy.contains('button','Enviar').click()
        
                cy.get('.success').should('be.visible')
                cy.tick(THREE_SECONDS_IN_MS)
                cy.get('.success').should('not.be.visible')
        })
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.clock()
        
        cy.get('#firstName').type('Isadora')
        cy.get('#lastName').type('Ito')
        cy.get('#email').type('isadoraito@gmail,com')
        cy.get('#open-text-area').type('Quero reemboloso')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.clock()


        cy.get('#firstName').type('Isadora')
        cy.get('#lastName').type('Ito')
        cy.get('#email').type('isadoraito@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Quero reemboloso')
        cy.contains('button','Enviar').click()
        
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    }) 

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Isadora')
            .should('have.value', 'Isadora')
            .clear().should('have.value', '')
        cy.get('#lastName')
            .type('Ito')
            .should('have.value', 'Ito')
            .clear().should('have.value', '')
        cy.get('#email')
            .type('isadoraito@gmail.com')
            .should('have.value', 'isadoraito@gmail.com')
            .clear().should('have.value', '')
        cy.get('#phone')
            .type('65999999999')
            .should('have.value', '65999999999')
            .clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                .should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                //console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type=file')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                //console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('file')
        cy.get('input[type=file]')
            .selectFile('@file')
            .then(input => {
                expect(this.file).to.equal(this.file)
            })

    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a')
            .should('have.attr', 'target','_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function(){
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

    it('preenche a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })
  })