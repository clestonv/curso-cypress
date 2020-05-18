/// <reference types="cypress" />

describe('Dinamics Tests', () => {   
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html') // Hooks
    })

    it('Voltando ao Passado..', () => {
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain','17/05/2020')

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain','31/12/1969')

        const dt = new Date(2012,3, 10, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain','10/04/2012')
    })
})
