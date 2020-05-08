describe('SenffOffice', () => {
    it('ConfigurarOffice', () => {
        cy.visit('http://172.16.5.87:9002/Login.aspx');
        cy.get('#ucLogin_btnConfiguracoes').click();
        cy.get('#txtCNPJConfig').focus().type(' 15119988000180');
        cy.get('#ucConfiguracoes_btnAlterar').click();
        cy.get('#txtUsuario').type('jessi');
        cy.get('#ucLogin_txtPass').type('123456');
        cy.get('#ucLogin_btnAbrirTerminal').click();
        cy.get('.dynamsoft-dialog-close').click();
        cy.get('#image7').click();
        cy.get('#lnkNovaPropostaCRP').click().wait(13000)
        // cy.get('#ui-id-10').select('#nome')
        cy.get('#txtNome').type('Cleberson Tadeu Souza Osorio');
        cy.get('#ucNovaProposta2_txtCPF').type('38338152803');
        cy.get('tbody > :nth-child(3) > :nth-child(2) > #txtEmail').click({force: true});
        // cy.get('#ucNovaProposta2_txtCPF').tab();
        // // cy.pause();
        // cy.get('#ucNovaProposta2_txtDataNascimento2');
        cy.wait(2000);
        cy.get('#ucNovaProposta2_txtDataNascimento2').type('23021989').tab();
        cy.wait(1000)
        cy.get('tbody > :nth-child(3) > :nth-child(2) > #txtEmail').focus({force:true}).type('jozelitagem@gmail.com')
        cy.get('#ucNovaProposta2_txtDDDCelularEnderecoToken').type('41')
        cy.get('#ucNovaProposta2_txtCelularEnderecoToken').type('997181109').tab()
        cy.wait(1000)

        cy.get('#txtDDDCelularEnderecoConfirmaToken').focus().type('41').tab()
        cy.wait(1000)
        cy.get('#txtCelularEnderecoConfirmaToken').type('997181109').tab().tab().tab()
        // cy.pause()
        cy.wait(1000)
        cy.get('#txtRG').type('445524418')
        cy.get('[aria-describedby="divAlerta"] > .ui-dialog-titlebar > .ui-button > .ui-button-icon-primary').click({force: true})
        // cy.get('.abaEmpresa > a').click();
        // cy.get('#conteudoMaster_fieldCNPJ').type('004113');
        // cy.get('#conteudoMaster_btnEntrarEmpresa').click()
        // cy.get('#nome').type('Cleberson Tadeu Souza Osorio');
    });

    // it('PropostaCRP', () => {
    //     cy.get('#image7').click();
    //     cy.get('#lnkNovaPropostaCRP').click();
    // });
});