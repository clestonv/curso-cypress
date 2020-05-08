/// <reference types="cypress" />

describe('Work with basic elements', () => {
    it.skip('Text', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('body').should('contain', 'Cuidado');
        cy.get('span').should('contain','Cuidado');
        cy.get('.facilAchar').should('contain',' Cuidado')
    })

    it.only('Links..', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text','Voltou!')

        cy.reload() // Refres na Tela
        cy.get('#resultado').should('have.not.text','Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text','Voltou!')
    })
})