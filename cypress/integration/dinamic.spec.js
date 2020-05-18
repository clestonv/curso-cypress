/// <reference types="cypress" />

describe('Dinamics Tests', () => {   
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html') // Hooks
    })

    const foods = ['Carne','Frango','Pizza','Vegetariano']
    foods.forEach(food => {
        it(`Cadastro Comida ${food}`, () => {  
            cy.get('#formNome').type('Usuario')
            cy.get('[data-cy=dataSobrenome]').type('Qualquer')
            cy.get(`[name=formSexo][value=F]`).click()
            cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('have.text','Cadastrado!')
        })
    })

    
})