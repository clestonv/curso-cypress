/// <reference types="cypress" />

describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me') // Hooks
        cy.get('[data-test=email]').type('cleberson.osorioti@hotmail.com')
        cy.get('[data-test=passwd]').type('T@bl3tenis')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain','Bem vindo')
    })

    it('Should create an account', ()=> {
        cy.get('[data-test=menu-settings] > .fas').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test=nome]').type('Conta Teste')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain','Conta inserida com sucesso!')
    })
})