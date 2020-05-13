/// <reference types="cypress" />

describe('Cypress Basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        // const title = cy.title()
        // console.log(title)
        cy.title().should('be.equal','Campo de Treinamento')
        cy.title().should('contain','Campo de Treinamento')

        cy.title()
            .should('be.equal','Campo de Treinamento')
            .and('contain','Campo de Treinamento').debug()

        cy.title().should(title => {
            console.log(title)
        })
    })

    it('Should find and interact with an element ..', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
            .should('have.value', 'Clique Me!')
            .click()
            .should('have.value', 'Obrigado!')
    })
})