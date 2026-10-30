const seletores = {
    rodape: '#footer',
    tituloAssinatura: '.single-widget h2',
    email: '#susbscribe_email',
    botaoAssinar: '#subscribe',
    mensagemSucesso: '#success-subscribe',
};

function acessarPaginaInicial() {
    cy.visit('/');
}

function rolarAteRodape() {
    cy.get(seletores.rodape).scrollIntoView();
}

function validarSecaoAssinaturaVisivel() {
    cy.get(seletores.tituloAssinatura)
      .should('be.visible')
      .and('contain.text', 'Subscription');
}

function assinarNewsletter(email) {
    cy.get(seletores.email).type(email);
    cy.get(seletores.botaoAssinar).click();
}

function validarAssinaturaRealizada() {
    cy.get(seletores.mensagemSucesso)
      .should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!');
}

module.exports = {
    acessarPaginaInicial,
    rolarAteRodape,
    validarSecaoAssinaturaVisivel,
    assinarNewsletter,
    validarAssinaturaRealizada,
};