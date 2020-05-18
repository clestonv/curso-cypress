/// <reference types="cypress" />

describe('Fixtures tests', () => {   
    it('Get data form fixture file', function() {
        cy.visit('https://wcaquino.me/cypress/componentes.html') // Hooks
        cy.fixture('userDate').as('usuario').then(() => {
            cy.get('#formNome').type(this.usuario.nome)
            cy.get('[data-cy=dataSobrenome]').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
            cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click()
            cy.get('#formEscolaridade').select(this.usuario.escolaridade)
            cy.get('#formEsportes').select(this.usuario.esportes)
            
        })
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('have.text','Cadastrado!')
        
    })


})