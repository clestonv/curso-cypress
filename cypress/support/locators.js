const locators = {
    login: {
        user: '[data-test=email]',
        password: '[data-test=passwd]',
        btn_login:'.btn',
    },
    menu: {
        settings:'[data-test=menu-settings] > .fas',
        contas:'[href="/contas"]',
        reset: '[href="/reset"]'
    },
    conta: {
        nome: '[data-test=nome]',
        btn_salvar: '.btn',
        xp_btn_alterar: "//table//td[contains(., 'Conta Teste')]/..//i[@class='far fa-edit']",
    },
    message:'.toast-message',
}

export default locators;