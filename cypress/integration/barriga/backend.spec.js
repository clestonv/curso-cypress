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
        cy.getContaByName('Conta para alterar')
        .then(contaId => {
            cy.request({
                url: `/contas/${contaId}`,
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

    it('Should not create an account with same name',() => {
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

    it('Should create a transaction',() => {
        cy.getContaByName('Conta para movimentacoes')
        .then(contaId => {
            cy.request({
                method: 'POST',
                url: '/transacoes',
                headers:{
                    Authorization: `JWT ${token}` // Inserindo o token
                },
                body: {
                    conta_id: contaId,
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: "Des",
                    envolvido: "inter",
                    status: true,
                    tipo: "REC",
                    valor: "123",
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('to.be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it('Should get balance', () => {        
       
    })

    it('Should remova a transaction', () => {
       
    })
}) 