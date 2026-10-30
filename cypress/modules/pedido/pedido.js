const carrinho = require('./carrinho');
const checkout = require('./checkout');



//Padrão Workflow/Facade: agrupa o fluxo de compra (carrinho + checkout + pagamento) 
// reutilizada pelos cenários TC15 e TC16.
function comprarProdutos(idsProdutos, usuario, cartao, comentario) {
    idsProdutos.forEach((id) => carrinho.adicionarProdutoAoCarrinho(id));
    carrinho.acessarCarrinho();
    carrinho.validarCarrinhoComProdutos(idsProdutos.length);
    carrinho.prosseguirParaCheckout();
    checkout.validarEnderecoERevisaoDoPedido(usuario);
    checkout.fazerPedido(comentario);
    checkout.pagarPedido(cartao);
}

module.exports = {
    comprarProdutos,
};