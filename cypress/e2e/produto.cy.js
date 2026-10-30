const produto = require('../modules/produto/produto');

describe('Produtos', () => {
    it('TC8 - deve exibir todos os produtos e o detalhe de um produto', () => {
        produto.acessarPaginaDeProdutos();
        produto.validarPaginaTodosProdutos();
        produto.visualizarPrimeiroProduto();
        produto.validarDetalhesDoProduto();
    });

    it('TC9 - deve buscar um produto pelo nome', () => {
        const termoBusca = 'Jeans';

        produto.acessarPaginaDeProdutos();
        produto.validarPaginaTodosProdutos();
        produto.buscarProduto(termoBusca);
        produto.validarResultadoDaBusca(termoBusca);
    });
});