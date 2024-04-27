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
        cy.get('#firstName').type('Isadora')
        cy.get('#lastName').type('Ito')
        cy.get('#email').type('isadoraito@gmail.com')
        cy.get('#open-text-area').type('Quero pedir reembolso')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
    
  })