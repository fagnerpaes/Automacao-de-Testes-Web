const seletores = {
    menuUsuario: '.navbar-nav',
    email: '[data-qa="login-email"]',
    senha: '[data-qa="login-password"]',
    botaoEntrar: '[data-qa="login-button"]',
    mensagemErro: 'form[action*="login"] > p',
};

function acessarLogin() {
    cy.visit('/login');
}

function efetuarLogin(email, senha) {
    cy.get(seletores.email).type(email);
    cy.get(seletores.senha).type(senha);
    cy.get(seletores.botaoEntrar).click();
}

function validarUsuarioLogado(nome) {
    cy.get(seletores.menuUsuario)
      .should('be.visible')
      .and('contain.text', `Logged in as ${nome}`);
}

function validarMensagemDeErroLogin() {
    cy.get(seletores.mensagemErro)
      .should('be.visible')
      .and('contain.text', 'Your email or password is incorrect!');
}

module.exports = {
    acessarLogin,
    efetuarLogin,
    validarUsuarioLogado,
    validarMensagemDeErroLogin,
};