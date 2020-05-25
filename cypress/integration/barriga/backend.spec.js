/// <reference types="cypress" />

describe('Work with alerts', () => {
    before(() => {
        
    })

    beforeEach(()=> {
       
    })
https://barrigarest.wcaquino.me/contas
    it('Should create an account', ()=> {
       cy.request({
           method: 'POST',
           url: 'https://barrigarest.wcaquino.me/signin',
           body: {
                email: "cleberson.osorioti@hotmail.com",
                redirecionar: false,
                senha: "T@bl3tenis",
           },
       }).its('body.token').should('not.be.empty')
       .then(token => {
            cy.request({
                url: 'https://barrigarest.wcaquino.me/contas',
                method: 'POST',
                headers:{
                    Authorization: `JWT ${token}`
                },
                body: {
                    nome: 'Conta via Rest',
                }
            }).as('response')
       })  
    cy.get('@response').then(res => {
        expect(res.status).to.be.equal(201)
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('nome','Conta via Rest')
    })
    })

    it('Should update an account', () => {
       
    })

    it('Should get balance', () => {        
       
    })

    it('Should remova a transaction', () => {
       
    })
}) 