const seletores = {
    menuProdutos: 'a[href="/products"]',
    tituloLista: '.features_items .title',
    listaProdutos: '.features_items .product-image-wrapper',
    linkVerProduto: '.features_items a[href^="/product_details/"]',
    detalhesProduto: '.product-information',
    nomeProduto: '.product-information h2',
    campoBusca: '#search_product',
    botaoBusca: '#submit_search',
    nomesProdutos: '.features_items .productinfo p',
};

function acessarPaginaDeProdutos() {
    cy.visit('/');
    cy.get(seletores.menuProdutos).click();
}

function validarPaginaTodosProdutos() {
    cy.url().should('include', '/products');
    cy.get(seletores.tituloLista)
      .should('be.visible')
      .and('contain.text', 'All Products');
    cy.get(seletores.listaProdutos).should('have.length.greaterThan', 0);
}

function visualizarPrimeiroProduto() {
    cy.get(seletores.linkVerProduto).first().click();
}

function validarDetalhesDoProduto() {
    cy.url().should('include', '/product_details/');
    cy.get(seletores.nomeProduto).should('be.visible').and('not.be.empty');
    cy.get(seletores.detalhesProduto)
      .should('contain.text', 'Category:')
      .and('contain.text', 'Rs.')
      .and('contain.text', 'Availability:')
      .and('contain.text', 'Condition:')
      .and('contain.text', 'Brand:');
}

function buscarProduto(termo) {
    cy.get(seletores.campoBusca).type(termo);
    cy.get(seletores.botaoBusca).click();
}

function validarResultadoDaBusca(termo) {
    cy.get(seletores.tituloLista)
      .should('be.visible')
      .and('contain.text', 'Searched Products');
    cy.get(seletores.nomesProdutos)
      .should('have.length.greaterThan', 0)
      .each(($nome) => {
          expect($nome.text().toLowerCase()).to.include(termo.toLowerCase());
      });
}

module.exports = {
    acessarPaginaDeProdutos,
    validarPaginaTodosProdutos,
    visualizarPrimeiroProduto,
    validarDetalhesDoProduto,
    buscarProduto,
    validarResultadoDaBusca,
};