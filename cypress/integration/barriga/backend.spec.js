/// <reference types="cypress" />

import '../../support/commands'

describe('Work with alerts', () => {
    let token

    before(() => {
        cy.getToken('cleberson.osorioti@hotmail.com','T@bl3tenis')
            .then(tkn => {
                token = tkn
            })
    })

    beforeEach(()=> {
        cy.resetRest()
    })  

    it('Should create an account', ()=> {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers:{
                Authorization: `JWT ${token}` // Inserindo o token
            },
            body: {
                nome: 'Conta via Rest',
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome','Conta via Rest')
        })
    })

    it('Should update an account', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers:{
                Authorization: `JWT ${token}` // Inserindo o token
            },
            qs: {
                nome: 'Conta para alterar'
            },
        }).then(res => {
            cy.request({
                url: `/contas/${res.body[0].id}`,
                method: 'PUT',
                headers:{
                     Authorization: `JWT ${token}` // Inserindo o token
                 },
                 body: {
                     nome: 'Conta Aleterada via Rest',
                 }            
            }).as('response')
        })       

       cy.get('@response').its('status').should('be.equal', 200)
    })

    it.only('Should not create an account with same name',() => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers:{
                Authorization: `JWT ${token}` // Inserindo o token
            },
            body: {
                nome: 'Conta mesmo nome',
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Should get balance', () => {        
       
    })

    it('Should remova a transaction', () => {
       
    })
}) 