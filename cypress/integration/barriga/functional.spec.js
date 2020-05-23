/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commands.conta'

describe('Work with alerts', () => {
    before(() => {
        cy.login('teste@cleston.com','cleston')
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

        cy.xpath(loc.conta.fn_xp_btn_alterar('Conta de Teste')).click()
        cy.get(loc.conta.nome)
            .clear()
            .type('Conta alterada')
        cy.get(loc.conta.btn_salvar).click()
        cy.get(loc.message).should('contain','Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.acessarMenuConta()

        cy.get(loc.conta.nome).type('Conta alterada')
        cy.get(loc.conta.btn_salvar).click()
        cy.get(loc.message).should('contain','code 400')
    })

    it('Should create a transaction', () => {
        cy.get(loc.menu.movimentacao).click()

        cy.get(loc.movimentacao.descricao).type('New')
        cy.get(loc.movimentacao.valor).type('250')
        cy.get(loc.movimentacao.interessado).type('Interessante')
        cy.get(loc.movimentacao.conta).select('Conta alterada')
        cy.get(loc.movimentacao.status).click()
        cy.get(loc.movimentacao.btn_salvar).click()
        cy.get(loc.message).should('contain','sucesso')

        cy.get(loc.extrato.linhas).should('have.length', 7)
        cy.xpath(loc.extrato.fn_xp_busca_elemento('New','250')).should('exist')
    })

    it('Should get balance', () => {
        console.log(loc.saldo.fn_xp_saldo_conta('Conta de Teste'))
        cy.get(loc.menu.home).click()
        cy.xpath(loc.saldo.fn_xp_saldo_conta('Conta alterada')).should('contain','250,00')

    })

    it('Should remova a transaction', () => {
        cy.get(loc.menu.extrato).click({force: true})
        cy.xpath(loc.extrato.fn_xp_remove_elemento('New')).click()
        cy.get(loc.message).should('contain','sucesso')
    })
})