/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commands.conta'
import buildEnv from '../../support/buildEnv'

describe('Work with alerts', () => {
    after(()=> {
        cy.clearLocalStorage()
    })
 
    beforeEach(()=> {  
        buildEnv()
        cy.login('teste@cleston.com','senha errada')     
        cy.get(loc.menu.home).click()
    })

    it('Should create an account', ()=> {
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
        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: {
                id: 1,
                nome: 'Conta alterada',
                visivel: true,
                usuario_id: 1
            },
        })
        cy.acessarMenuConta()

        cy.xpath(loc.conta.fn_xp_btn_alterar('Banco')).click()
        cy.get(loc.conta.nome)
            .clear()
            .type('Conta alterada')
        cy.get(loc.conta.btn_salvar).click()
        cy.get(loc.message).should('contain','Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {
                "error":"Já existe uma conta com esse nome!"              
            },
            status: 400
        }).as('SaveContaMesmoNome')

        cy.acessarMenuConta()

        cy.get(loc.conta.nome).type('Carteira')
        cy.get(loc.conta.btn_salvar).click()
        cy.get(loc.message).should('contain','code 400')
    })

    it('Should create a transaction', () => {
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: {"id":151164,"descricao":"aasdfsad","envolvido":"fasdfdas","observacao":null,"tipo":"REC","data_transacao":"2020-05-31T03:00:00.000Z","data_pagamento":"2020-05-31T03:00:00.000Z","valor":"645645.00","status":false,"conta_id":171232,"usuario_id":9956,"transferencia_id":null,"parcelamento_id":null}
        })

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva'
        })

        cy.get(loc.menu.movimentacao).click()

        cy.get(loc.movimentacao.descricao).type('New')
        cy.get(loc.movimentacao.valor).type('250',{force: true})
        cy.get(loc.movimentacao.interessado).type('Interessante')
        cy.get(loc.movimentacao.conta).select('Banco')
        cy.get(loc.movimentacao.status).click()
        cy.get(loc.movimentacao.btn_salvar).click()
        cy.get(loc.message).should('contain','sucesso')

        cy.get(loc.extrato.linhas).should('have.length', 7)
        cy.xpath(loc.extrato.fn_xp_busca_elemento('New','250')).should('exist')
    })

    it('Should get balance', () => {        
        cy.route({
            method: 'GET',
            url: '/transacoes/**',
            response:  {
                "conta": "Conta para saldo",
                "id": 151248,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2020-05-31T03:00:00.000Z",
                "data_pagamento": "2020-05-31T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 171920,
                "usuario_id": 9956,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })

        cy.route({
            method: 'PUT',
            url: '/transacoes/**',
            response:  {
                "conta": "Conta para saldo",
                "id": 151248,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2020-05-31T03:00:00.000Z",
                "data_pagamento": "2020-05-31T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 171920,
                "usuario_id": 9956,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })
        cy.get(loc.menu.home).click()
        cy.xpath(loc.saldo.fn_xp_saldo_conta('Carteira')).should('contain','100,00')

        cy.get(loc.menu.extrato).click()
        cy.xpath(loc.extrato.fn_xp_alterar_elemento('Movimentacao 1, calculo saldo')).click()
        // cy.wait(2000)
        cy.get(loc.movimentacao.descricao).should('have.value','Movimentacao 1, calculo saldo')
        cy.get(loc.movimentacao.status).click()
        cy.get(loc.movimentacao.btn_salvar).click()
        cy.get(loc.message).should('contain','sucesso')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [{
                conta_id: 999,
                conta:"Carteira",
                saldo: "4034.00"                
            },{
                conta_id: 9909,
                conta:"Banco",
                saldo: "21000000.00"                
            }]
        }).as('SaldoFinal')

        cy.get(loc.menu.home).click()
        cy.xpath(loc.saldo.fn_xp_saldo_conta('Carteira')).should('contain','4.034,00')
    })

    it('Should remova a transaction', () => {
        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            response: {},
            status: 204
        }).as('Delete')

        cy.get(loc.menu.extrato).click({force: true})
        cy.xpath(loc.extrato.fn_xp_remove_elemento('Movimentacao para exclusao')).click()
        cy.get(loc.message).should('contain','sucesso')        
    })

    it('Should validate data send to create an account', ()=> {
        const reqStub = cy.stub()
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {
                id: 3,
                nome: 'Conta de Teste',
                visivel: true,
                usuario_id: 1
            },
            // onRequest: req => {
            //     console.log(req)
            //     expect(req.request.body.nome).to.be.empty
            //     expect(req.request.headers).to.have.property('Authorization')
            // }
            onRequest: reqStub
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
    
        cy.inserirConta('{CONTROL}')
        // cy.wait('@ContasSave').its('request.body.nome').should('not.be.empty')
        cy.wait('@ContasSave').then(() => {
            console.log(reqStub.args[0][0])
            expect(reqStub.args[0][0].request.body.nome).to.be.empty
            expect(reqStub.args[0][0].request.headers).to.have.property('Authorization')
        })
        cy.get(loc.message).should('contain','Conta inserida com sucesso!')
    })

    it.only('Should test colors', () =>{
        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: [
                {"conta":"Conta para movimentacoes","id":151246,"descricao":"Receita paga","envolvido":"AAA","observacao":null,"tipo":"REC","data_transacao":"2020-05-31T03:00:00.000Z","data_pagamento":"2020-05-31T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":171918,"usuario_id":9956,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta com movimentacao","id":151247,"descricao":"Receita pendente","envolvido":"BBB","observacao":null,"tipo":"REC","data_transacao":"2020-05-31T03:00:00.000Z","data_pagamento":"2020-05-31T03:00:00.000Z","valor":"-1500.00","status":false,"conta_id":171919,"usuario_id":9956,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":151248,"descricao":"Despesa paga","envolvido":"CCC","observacao":null,"tipo":"DESP","data_transacao":"2020-05-31T03:00:00.000Z","data_pagamento":"2020-05-31T03:00:00.000Z","valor":"3500.00","status":true,"conta_id":171920,"usuario_id":9956,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":151249,"descricao":"Despesa pendente","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2020-05-31T03:00:00.000Z","data_pagamento":"2020-05-31T03:00:00.000Z","valor":"-1000.00","status":false,"conta_id":171920,"usuario_id":9956,"transferencia_id":null,"parcelamento_id":null},
               ]
        })

        cy.get(loc.menu.extrato).click()
        cy.xpath(loc.extrato.fn_xp_linha('Receita paga')).should('have.class','receitaPaga')
        cy.xpath(loc.extrato.fn_xp_linha('Receita pendente')).should('have.class','receitaPendente')
        cy.xpath(loc.extrato.fn_xp_linha('Despesa paga')).should('have.class','despesaPaga')
        cy.xpath(loc.extrato.fn_xp_linha('Despesa pendente')).should('have.class','despesaPendente')
    })
}) 

