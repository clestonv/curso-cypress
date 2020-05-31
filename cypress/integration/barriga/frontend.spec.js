/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commands.conta'

describe('Work with alerts', () => {
    after(()=> {
        cy.clearLocalStorage()
    })
    before(() => {
        cy.server()
        cy.route({
            method: 'POST',
            url: 'signin',
            response: {
                id:9956,
                nome:"Cleberson Osorio",
                token: "Uma string muinto grande"
            }
        }).as('Login')
        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{
                conta_id: 999,
                conta:"Carteira",
                saldo: "100.00"                
            },{
                conta_id: 9909,
                conta:"Banco",
                saldo: "21000000.00"                
            }]
        }).as('Saldo')
        cy.login('teste@cleston.com','senha errada')        
       
    })

    beforeEach(()=> {
        cy.get(loc.menu.home).click()
        // cy.resetApp()
    })

    it('Should create an account', ()=> {
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [{
                id: 1,
                nome: 'Carteira',
                visivel: true,
                usuario_id: 1
            },{
                id: 2,
                nome: 'Banco',
                visivel: true,
                usuario_id: 1
            }]
        }).as('Contas')

        cy.route({
            method: 'POST',
            url: '/contas',
            response: {
                id: 3,
                nome: 'Conta de Teste',
                visivel: true,
                usuario_id: 1
            }
        }).as('SaveConta')
        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [{
                id: 1,
                nome: 'Carteira',
                visivel: true,
                usuario_id: 1
            },{
                id: 2,
                nome: 'Banco',
                visivel: true,
                usuario_id: 1
            },
            {
                id: 3,
                nome: 'Conta de Teste',
                visivel: true,
                usuario_id: 1
            }]
        }).as('ContasSave')

        cy.inserirConta('Conta de Teste')
        cy.get(loc.message).should('contain','Conta inserida com sucesso!')
    })

    it('Should update an account', () => {
        // cy.get(':nth-child(1) > :nth-child(2) > .fa-edit')
        cy.acessarMenuConta()

        cy.xpath(loc.conta.fn_xp_btn_alterar('Conta para alterar')).click()
        cy.get(loc.conta.nome)
            .clear()
            .type('Conta alterada')
        cy.get(loc.conta.btn_salvar).click()
        cy.get(loc.message).should('contain','Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.acessarMenuConta()

        cy.get(loc.conta.nome).type('Conta mesmo nome')
        cy.get(loc.conta.btn_salvar).click()
        cy.get(loc.message).should('contain','code 400')
    })

    it('Should create a transaction', () => {
        cy.get(loc.menu.movimentacao).click()

        cy.get(loc.movimentacao.descricao).type('New')
        cy.get(loc.movimentacao.valor).type('250',{force: true})
        cy.get(loc.movimentacao.interessado).type('Interessante')
        cy.get(loc.movimentacao.conta).select('Conta para movimentacoes')
        cy.get(loc.movimentacao.status).click()
        cy.get(loc.movimentacao.btn_salvar).click()
        cy.get(loc.message).should('contain','sucesso')

        cy.get(loc.extrato.linhas).should('have.length', 7)
        cy.xpath(loc.extrato.fn_xp_busca_elemento('New','250')).should('exist')
    })

    it('Should get balance', () => {        
        cy.get(loc.menu.home).click()
        cy.xpath(loc.saldo.fn_xp_saldo_conta('Conta para saldo')).should('contain','534,00')

        cy.get(loc.menu.extrato).click()
        cy.xpath(loc.extrato.fn_xp_alterar_elemento('Movimentacao 1, calculo saldo')).click()
        // cy.wait(2000)
        cy.get(loc.movimentacao.descricao).should('have.value','Movimentacao 1, calculo saldo')
        cy.get(loc.movimentacao.status).click()
        cy.get(loc.movimentacao.btn_salvar).click()
        cy.get(loc.message).should('contain','sucesso')

        cy.get(loc.menu.home).click()
        cy.xpath(loc.saldo.fn_xp_saldo_conta('Conta para saldo')).should('contain','4.034,00')
    })

    it('Should remova a transaction', () => {
        cy.get(loc.menu.extrato).click({force: true})
        cy.xpath(loc.extrato.fn_xp_remove_elemento('Movimentacao para exclusao')).click()
        cy.get(loc.message).should('contain','sucesso')        
    })
}) 