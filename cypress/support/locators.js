const locators = {
    login: {
        user: '[data-test=email]',
        password: '[data-test=passwd]',
        btn_login:'.btn',
    },
    menu: {
        settings:'[data-test=menu-settings] > .fas',
        contas:'[href="/contas"]',
        reset: '[href="/reset"]',
        movimentacao:'[data-test=menu-movimentacao]',
    },
    conta: {
        nome: '[data-test=nome]',
        btn_salvar: '.btn',
        xp_btn_alterar: "//table//td[contains(., 'Conta de Teste')]/..//i[@class='far fa-edit']",
    },
    movimentacao: {
        descricao: '[data-test=descricao]',
        valor: '[data-test=valor]',
        interessado: '[data-test=envolvido]',
        btn_salvar: '.btn-primary',

    },
    extrato: {
        linhas: '.list-group > li',
        xp_busca_elemento: "//span[contains(., 'New')]/following-sibling::small[contains(.,'250')]",
    },
    message:'.toast-message',
}

export default locators;