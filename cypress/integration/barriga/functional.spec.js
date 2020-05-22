/// <reference types="cypress" />

import loc from '../../support/locators'

describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me') // Hooks
        cy.get(loc.login.user).type('cleberson.osorioti@hotmail.com')
        cy.get(loc.login.password).type('T@bl3tenis')
        cy.get(loc.login.btn_login).click()
        cy.get(loc.message).should('contain','Bem vindo')
    })

    it('Should create an account', ()=> {
        cy.get(loc.menu.settings).click()
        cy.get(loc.menu.contas).click()
        cy.get(loc.conta.nome).type('Conta Teste')
        cy.get(loc.conta.btn_salvar).click()
        cy.get(loc.message).should('contain','Conta inserida com sucesso!')
    })

    it('Should update an account', () => {
        // cy.get(':nth-child(1) > :nth-child(2) > .fa-edit')
        cy.get(loc.menu.settings).click()
        cy.get(loc.menu.contas).click()
        cy.xpath(loc.conta.xp_btn_alterar).click()
        cy.get(loc.conta.nome)
            .clear()
            .type('Conta alterada')
        cy.get(loc.conta.btn_salvar).click()
        cy.get(loc.message).should('contain','Conta atualizada com sucesso!')
    })
})