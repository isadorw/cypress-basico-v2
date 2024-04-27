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
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Isadora')
        cy.get('#lastName').type('Ito')
        cy.get('#email').type('isadoraito@gmail,com')
        cy.get('#open-text-area').type('Quero reemboloso') // delay: 0 ajuda o teste a ser mais rápido
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })
  })