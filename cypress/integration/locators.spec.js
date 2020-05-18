/// <reference types="cypress" />

describe('Validando Mensagems ...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html') // Hooks
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Using Jquery Selector',() => {
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input').click()
        cy.get('[onclick*=\'Francisco\']').click() // Crackeando com contra barras \\
        cy.get("[onclick*='Francisco']").click() // Crackeando com aspas duplas ""
        cy.get('#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~td:eq(3)')
        cy.get('#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) input')
    })

    it('Using xpath',() => {
        cy.xpath('//input[contains(@onclick, \'Francisco\')]')
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input[@type='text']")
        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']").type('Funciona')
    })

})