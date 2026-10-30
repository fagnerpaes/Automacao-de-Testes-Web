const seletores = {
        botaoAdicionar: (idProduto) => `.features_items .productinfo a[data-product-id="${idProduto}"]`,
    modalCarrinho: '#cartModal',
    botaoContinuarComprando: '#cartModal .close-modal',
    menuCarrinho: '.shop-menu a[href="/view_cart"]',
    tabelaCarrinho: '#cart_info_table',
    itensCarrinho: '#cart_info_table tbody tr',
    botaoCheckout: '.check_out',
};

/* falha intermitente (flaky)
function adicionarProdutoAoCarrinho(idProduto) {
    cy.get(seletores.botaoAdicionar(idProduto)).click();
    cy.get(seletores.modalCarrinho).should('be.visible');
    cy.get(seletores.botaoContinuarComprando).click();
}
*/

//esperar a requisição do site
function adicionarProdutoAoCarrinho(idProduto) {
    cy.intercept('GET', `/add_to_cart/${idProduto}`).as('adicionarAoCarrinho');

    cy.get(seletores.botaoAdicionar(idProduto)).click();

    cy.wait('@adicionarAoCarrinho')
      .its('response.statusCode')
      .should('eq', 200);
    cy.get(seletores.modalCarrinho)
      .should('be.visible')
      .and('contain.text', 'Your product has been added to cart.');
    cy.get(seletores.botaoContinuarComprando).click();
    cy.get(seletores.modalCarrinho).should('not.be.visible');
}


function acessarCarrinho() {
    cy.get(seletores.menuCarrinho).click();
}

function validarCarrinhoComProdutos(quantidade) {
    cy.url().should('include', '/view_cart');
    cy.get(seletores.tabelaCarrinho).should('be.visible');
    cy.get(seletores.itensCarrinho).should('have.length', quantidade);
}

function prosseguirParaCheckout() {
    cy.get(seletores.botaoCheckout).click();
}

module.exports = {
    adicionarProdutoAoCarrinho,
    acessarCarrinho,
    validarCarrinhoComProdutos,
    prosseguirParaCheckout,
};