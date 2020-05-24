/// <reference types="cypress" />

describe('Work with alerts', () => {
    before(() => {
        
    })

    beforeEach(()=> {
       
    })

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
    })

    it('Should update an account', () => {
       
    })

    it('Should get balance', () => {        
       
    })

    it('Should remova a transaction', () => {
       
    })
}) 