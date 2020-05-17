describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html') // Hooks
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Alert',() => {
        cy.get('#alert').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        })
    })

    it.only('Alert com mock',() => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
        
    })

    it.only('Confirm ..',() => {
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
        }) 
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirmado')
        }) 
        cy.get('#confirm').click()        
    })

    it.only('Deny ..',() => {
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
            return false      //False para cancelar o Confirm
        }) 
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Negado')
        }) 
        cy.get('#confirm').click()        
    })

    // Prompt
    it.only('Prompt ..',() => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('45')
        })
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Era 45?')
        }) 
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal(':D')
        }) 
        cy.get('#prompt').click()        
    })

    it.only('Validando Mensagem',() => {
        const stub = cy.stub().as('Alertas')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))        
        cy.get('#formNome').type('Cleberson')

        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))
        cy.get('[data-cy=dataSobrenome]').type('Osorio')

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('have.text','Cadastrado!')
    })
})