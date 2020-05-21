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

    it('Should update an account', () => {
        // cy.get(':nth-child(1) > :nth-child(2) > .fa-edit')
        cy.get('[data-test=menu-settings] > .fas').click()
        cy.get('[href="/contas"]').click()
        cy.xpath("//table//td[contains(., 'Conta Teste')]/..//i[@class='far fa-edit']").click()
        cy.get('[data-test=nome]')
            .clear()
            .type('Conta alterada')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain','Conta atualizada com sucesso!')
    })
})