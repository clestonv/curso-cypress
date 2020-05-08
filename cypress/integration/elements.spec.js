/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html') // Hooks
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {        
        cy.get('body').should('contain', 'Cuidado');
        cy.get('span').should('contain','Cuidado');
        cy.get('.facilAchar').should('contain',' Cuidado')
    })

    it('Links..', () => {        
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text','Voltou!')

        cy.reload() // Refres na Tela
        cy.get('#resultado').should('have.not.text','Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text','Voltou!')
    })
})