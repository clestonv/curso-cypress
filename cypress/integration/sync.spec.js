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

    it('Deve fazer retrys',()=> {  
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')            
            .should('exist') 
       
    })

    it.only('Buscar Find...', () => {
        cy.get('#buttonListDOM').click()

        cy.get('#lista li ')
            .find('span')
            .should('contain','Item 1')

        cy.get('#lista li span')
            .should('contain','Item 2')
        
    })
})




