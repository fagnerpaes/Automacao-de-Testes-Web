const seletores = {
    menuUsuario: '.navbar-nav',
};

function validarUsuarioLogado(nome) {
    cy.get(seletores.menuUsuario)
      .should('be.visible')
      .and('contain.text', `Logged in as ${nome}`);
}

module.exports = {
    validarUsuarioLogado,
};