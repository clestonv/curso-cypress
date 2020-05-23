const locators = {
    login: {
        user: '[data-test=email]',
        password: '[data-test=passwd]',
        btn_login:'.btn',
    },
    menu: {
        home: '[data-test=menu-home]',
        settings:'[data-test=menu-settings] > .fas',
        contas:'[href="/contas"]',
        reset: '[href="/reset"]',
        movimentacao:'[data-test=menu-movimentacao]',
    },
    conta: {
        nome: '[data-test=nome]',
        btn_salvar: '.btn',
        fn_xp_btn_alterar: nome => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`,
    },
    movimentacao: {
        descricao: '[data-test=descricao]',
        valor: '[data-test=valor]',
        interessado: '[data-test=envolvido]',
        conta: '[data-test=conta]',
        status: '[data-test=status]',
        btn_salvar: '.btn-primary',

    },
    extrato: {
        linhas: '.list-group > li',
        fn_xp_busca_elemento: (desc, value) => `//span[contains(., '${desc}')]/following-sibling::small[contains(.,'${value}')]`,
    },
    saldo: {
        fn_xp_saldo_conta: nome => `//td[contains(., '${nome}')]/../td[2]`,
    },
    message:'.toast-message',
}

export default locators;