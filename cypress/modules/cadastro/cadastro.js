const seletores = {
    nomeSignup: '[data-qa="signup-name"]',
    emailSignup: '[data-qa="signup-email"]',
    botaoSignup: '[data-qa="signup-button"]',
    tituloSr: '#id_gender1',
    tituloSra: '#id_gender2',
    senha: '[data-qa="password"]',
    diaNascimento: '[data-qa="days"]',
    mesNascimento: '[data-qa="months"]',
    anoNascimento: '[data-qa="years"]',
    newsletter: '#newsletter',
    ofertas: '#optin',
    primeiroNome: '[data-qa="first_name"]',
    ultimoNome: '[data-qa="last_name"]',
    empresa: '[data-qa="company"]',
    endereco: '[data-qa="address"]',
    endereco2: '[data-qa="address2"]',
    pais: '[data-qa="country"]',
    estado: '[data-qa="state"]',
    cidade: '[data-qa="city"]',
    cep: '[data-qa="zipcode"]',
    celular: '[data-qa="mobile_number"]',
    botaoCriarConta: '[data-qa="create-account"]',
    mensagemContaCriada: '[data-qa="account-created"]',
    botaoContinuar: '[data-qa="continue-button"]',
    linkExcluirConta: 'a[href="/delete_account"]',
    mensagemContaExcluida: '[data-qa="account-deleted"]',
    mensagemEmailExistente: 'form[action*="signup"] p',
};

function acessarPaginaDeCadastro() {
    cy.visit('/login');
}

function iniciarCadastro(nome, email) {
    cy.get(seletores.nomeSignup).type(nome);
    cy.get(seletores.emailSignup).type(email);
    cy.get(seletores.botaoSignup).click();
}

function preencherDadosDaConta(usuario) {
    cy.get(seletores.tituloSr).check();
    cy.get(seletores.senha).type(usuario.senha);
    cy.get(seletores.diaNascimento).select(usuario.dia);
    cy.get(seletores.mesNascimento).select(usuario.mes);
    cy.get(seletores.anoNascimento).select(usuario.ano);
    cy.get(seletores.newsletter).check();
    cy.get(seletores.ofertas).check();   

}

function preencherEndereco(usuario) {
    cy.get(seletores.primeiroNome).type(usuario.primeiroNome);
    cy.get(seletores.ultimoNome).type(usuario.ultimoNome);
    cy.get(seletores.empresa).type(usuario.empresa);
    cy.get(seletores.endereco).type(usuario.endereco);
    cy.get(seletores.endereco2).type(usuario.endereco2);
    cy.get(seletores.pais).select(usuario.pais);
    cy.get(seletores.estado).type(usuario.estado);
    cy.get(seletores.cidade).type(usuario.cidade);
    cy.get(seletores.cep).type(usuario.cep);
    cy.get(seletores.celular).type(usuario.celular);
}

function criarConta() {
    cy.get(seletores.botaoCriarConta).click();
}

function validarContaCriada() {
    cy.get(seletores.mensagemContaCriada)
      .should('be.visible')
      .and('contain.text', 'Account Created!');
}

function continuar() {
    cy.get(seletores.botaoContinuar).click();
}

function excluirConta() {
    cy.get(seletores.linkExcluirConta).click();
}

function validarContaExcluida() {
    cy.get(seletores.mensagemContaExcluida)
      .should('be.visible')
      .and('contain.text', 'Account Deleted!');
}

function cadastrarUsuario(usuario, email) {
    acessarPaginaDeCadastro();
    iniciarCadastro(usuario.nome, email);
    preencherDadosDaConta(usuario);
    preencherEndereco(usuario);
    criarConta();
    validarContaCriada();
    continuar();
}

function validarMensagemEmailExistente() {
    cy.get(seletores.mensagemEmailExistente)
      .should('be.visible')
      .and('contain.text', 'Email Address already exist!');
}


module.exports = {
    acessarPaginaDeCadastro,
    iniciarCadastro,
    preencherDadosDaConta,
    preencherEndereco,
    criarConta,
    validarContaCriada,
    continuar,
    excluirConta,
    validarContaExcluida,
    cadastrarUsuario,
    validarMensagemEmailExistente
};