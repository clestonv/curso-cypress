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

    it.only('Uso do timeout', ()=> {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo', {timeout: 1000}).should('exist') // Controlando o Timeout do Cypress
        
        // cy.get('#buttonListDOM').click()
        // // cy.wait(5000) Usar em casos extremos
        // cy.get('#lista li span', {timeout: 30000}) // O tempo que ele espera, se a condição for atendida ele passa
        //     .should('contain','Item 2')
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span', {timeout: 30000})
            .should('have.length',1) // Verificar o tamanho da lista
        cy.get('#lista li span')
            .should('have.length',2)
    })

    it.only('Click Retry', ()=> {
        cy.get('#buttonCount')
            .click()
            .should('have.value','111')

    })
    
    it.only('Should Vs The', ()=> {
        cy.get('#buttonListDOM').then($el => {
            console.log($el)
            expect($el).to.have.length(1)
        }).and('have.id','buttonListDOM')
            
    })
})




