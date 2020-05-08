describe('Lojinha', () => {
    it('Editar Produto', () => {
        cy.visit('http://172.16.5.87:9008/');
        cy.get('.abaEmpresa > a').click();
        cy.get('#conteudoMaster_fieldCNPJ').type('004113');
        cy.get('#conteudoMaster_btnEntrarEmpresa').click()
        
        // cy.get('#nome').type('Cleberson Tadeu Souza Osorio');
    });
});