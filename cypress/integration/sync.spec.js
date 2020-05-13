/// <reference types="cypress" />

describe('Esperas', ()=> {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html') // Hooks
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Deve aguardar elemento',()=> {      
        cy.get('#novoCampo').should('not.exist') 
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist') 
        cy.get('#novoCampo').type('Funciona')
    })
})




