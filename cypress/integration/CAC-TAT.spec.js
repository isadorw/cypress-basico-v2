/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
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

    // resolução da videoaula
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non porta orci, vitae gravida enim. Curabitur pharetra orci nec metus accumsan facilisis. Aenean rutrum odio quis turpis aliquam, vitae volutpat mauris consequat. Aliquam egestas ullamcorper nunc et lacinia. Etiam viverra ullamcorper nisl, tincidunt ornare erat mattis in. Duis id luctus arcu. Maecenas molestie, ante molestie convallis gravida, metus risus ultrices massa, ac feugiat orci est at libero. Sed suscipit blandit tellus, at placerat nulla. Nulla convallis libero nec velit finibus, a ultrices libero lobortis. Maecenas ut massa feugiat, dignissim orci in, consectetur eros. Maecenas vitae lacus erat. Praesent vel lobortis nulla. Nunc id nulla facilisis, placerat nunc quis, viverra risus. Aenean eu scelerisque nisi, mollis condimentum urna. Donec fermentum, enim in luctus posuere, diam sem sodales mauris, ut auctor dolor neque et ex. Aliquam quis imperdiet elit.'
        cy.get('#firstName').type('Isadora')
        cy.get('#lastName').type('Ito')
        cy.get('#email').type('isadoraito@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0}) // delay: 0 ajuda o teste a ser mais rápido
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Isadora')
        cy.get('#lastName').type('Ito')
        cy.get('#email').type('isadoraito@gmail,com')
        cy.get('#open-text-area').type('Quero reemboloso')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Isadora')
        cy.get('#lastName').type('Ito')
        cy.get('#email').type('isadoraito@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Quero reemboloso')
        cy.contains('button','Enviar').click()
        
        cy.get('.error').should('be.visible')
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
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
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
                cy.wrap($radio).should('be.false')
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
  })