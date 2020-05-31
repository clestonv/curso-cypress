const buildEnv  = () => {
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
            method: 'GET',
            url: '/extrato/**',
            response: [
                {"conta":"Conta para movimentacoes","id":151246,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2020-05-31T03:00:00.000Z","data_pagamento":"2020-05-31T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":171918,"usuario_id":9956,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta com movimentacao","id":151247,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2020-05-31T03:00:00.000Z","data_pagamento":"2020-05-31T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":171919,"usuario_id":9956,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":151248,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2020-05-31T03:00:00.000Z","data_pagamento":"2020-05-31T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":171920,"usuario_id":9956,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":151249,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2020-05-31T03:00:00.000Z","data_pagamento":"2020-05-31T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":171920,"usuario_id":9956,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":151250,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2020-05-31T03:00:00.000Z","data_pagamento":"2020-05-31T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":171920,"usuario_id":9956,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para extrato","id":151251,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2020-05-31T03:00:00.000Z","data_pagamento":"2020-05-31T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":171921,"usuario_id":9956,"transferencia_id":null,"parcelamento_id":null}]
        })
}

export default buildEnv