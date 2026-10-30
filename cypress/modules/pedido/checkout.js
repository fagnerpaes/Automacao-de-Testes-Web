const seletores = {
    enderecoEntrega: '#address_delivery',
    tabelaRevisao: '#cart_info',
    comentario: 'textarea[name="message"]',
    botaoFazerPedido: 'a[href="/payment"]',
    nomeCartao: '[data-qa="name-on-card"]',
    numeroCartao: '[data-qa="card-number"]',
    cvc: '[data-qa="cvc"]',
    mesValidade: '[data-qa="expiry-month"]',
    anoValidade: '[data-qa="expiry-year"]',
    botaoPagar: '[data-qa="pay-button"]',
    mensagemPedidoRealizado: '[data-qa="order-placed"]',
};

function validarEnderecoERevisaoDoPedido(usuario) {
    cy.contains('h2', 'Address Details').should('be.visible');
    cy.get(seletores.enderecoEntrega)
      .should('contain.text', `${usuario.primeiroNome} ${usuario.ultimoNome}`)
      .and('contain.text', usuario.endereco)
      .and('contain.text', usuario.cidade);
    cy.contains('h2', 'Review Your Order').should('be.visible');
    cy.get(seletores.tabelaRevisao).should('be.visible');
}

function fazerPedido(comentario) {
    cy.get(seletores.comentario).type(comentario);
    cy.get(seletores.botaoFazerPedido).click();
}

function pagarPedido(cartao) {
    cy.get(seletores.nomeCartao).type(cartao.nome);
    cy.get(seletores.numeroCartao).type(cartao.numero);
    cy.get(seletores.cvc).type(cartao.cvc);
    cy.get(seletores.mesValidade).type(cartao.mesValidade);
    cy.get(seletores.anoValidade).type(cartao.anoValidade);
    cy.get(seletores.botaoPagar).click();
}

function validarPedidoConfirmado() {
    cy.get(seletores.mensagemPedidoRealizado)
      .should('be.visible')
      .and('contain.text', 'Order Placed!');
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
}

module.exports = {
    validarEnderecoERevisaoDoPedido,
    fazerPedido,
    pagarPedido,
    validarPedidoConfirmado,
};