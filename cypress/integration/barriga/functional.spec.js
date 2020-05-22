/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commands.conta'

describe('Work with alerts', () => {
    before(() => {
        cy.login('cleberson.osorioti@hotmail.com','T@bl3tenis')
        cy.resetApp()
        // cy.visit('https://barrigareact.wcaquino.me') // Hooks
        // cy.get(loc.login.user).type('cleberson.osorioti@hotmail.com')
        // cy.get(loc.login.password).type('T@bl3tenis')
        // cy.get(loc.login.btn_login).click()
        // cy.get(loc.message).should('contain','Bem vindo')
    })

    it('Should create an account', ()=> {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de Teste')
        cy.get(loc.message).should('contain','Conta inserida com sucesso!')
    })

    it('Should update an account', () => {
        // cy.get(':nth-child(1) > :nth-child(2) > .fa-edit')
        cy.acessarMenuConta()
        
        cy.xpath(loc.conta.xp_btn_alterar).click()
        cy.get(loc.conta.nome)
            .clear()
            .type('Conta alterada')
        cy.get(loc.conta.btn_salvar).click()
        cy.get(loc.message).should('contain','Conta atualizada com sucesso!')
    })
})