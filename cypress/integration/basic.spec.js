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
        
            let syncTitle

        cy.title().then(title => {
            console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title
        })

        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
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