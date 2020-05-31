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
}

export default buildEnv