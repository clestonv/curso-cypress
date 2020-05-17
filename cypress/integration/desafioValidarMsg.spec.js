describe('Validando Mensagems ...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html') // Hooks
    })

    // beforeEach(() => {
    //     cy.reload()
    // })

    it('Cadastro Nome',() => {        
        cy.on('window:alert', msg => {  // Validação da Mensagem do Alert
            console.log(msg)
            expect(msg).to.be.equal('Nome eh obrigatorio')
        })
        cy.get('#formCadastrar').click()
        cy.get('#formNome').type('Cleberson')       
        cy.get('#resultado').should('have.text','Status: Nao cadastrado')
    })    

    it('Cadastro Sobrenome', () => {        
        cy.on('window:alert', msg => {  // Validação da Mensagem do Alert            
            expect(msg).to.be.equal('Sobrenome eh obrigatorio')
        })
        cy.get('#formCadastrar').click()
        cy.get('[data-cy=dataSobrenome]').type('Osorio')
        cy.get('#resultado').should('have.text','Status: Nao cadastrado')
    })

    it('Selecionar Sexo', () => {
        cy.on('window:alert', msg => {  // Validação da Mensagem do Alert            
            expect(msg).to.be.equal('Sexo eh obrigatorio')
        })
        cy.get('#formCadastrar').click()
        cy.get('#formSexoMasc')
            .click()
            .should('be.checked')
        cy.get('#resultado').should('have.text','Status: Nao cadastrado')
    })

    it('Cadastro', () => {
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('have.text','Cadastrado!')
        cy.get('#descNome > span').should('have.text','Cleberson')
        cy.get('#descSobrenome > span').should('have.text','Osorio')
        cy.get('#descSexo > span').should('have.text','Masculino')
    })

})