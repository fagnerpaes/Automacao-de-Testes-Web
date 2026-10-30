const seletores = {
    linkLogout: 'a[href*="logout"]',
    tituloLogin: '.login-form > h2',
};

function efetuarLogout() {
    cy.get(seletores.linkLogout)
      .should('be.visible')
      .click();
}

function validarUsuarioDeslogado() {
    cy.get(seletores.linkLogout).should('not.exist');
    cy.get(seletores.tituloLogin).should('be.visible');
    cy.url().should('include', '/login');
}

module.exports = {
    efetuarLogout,
    validarUsuarioDeslogado,
};