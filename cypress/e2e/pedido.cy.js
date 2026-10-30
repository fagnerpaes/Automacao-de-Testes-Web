const cadastro = require('../modules/cadastro/cadastro');
const login = require('../modules/login/login');
const logout = require('../modules/logout/logout');
const carrinho = require('../modules/pedido/carrinho');
const checkout = require('../modules/pedido/checkout');
const usuarios = require('../fixtures/usuarios.json');
const pagamento = require('../fixtures/pagamento.json');

describe('Pedido', () => {
    it('TC15 - deve fazer pedido cadastrando o usuário antes do checkout', () => {
        const usuario = usuarios.usuarioCadastro;
        const email = `pgats+${Date.now()}@teste.com`;

        // arrange: cadastrar o usuário
        cadastro.cadastrarUsuario(usuario, email);
        login.validarUsuarioLogado(usuario.nome);

        // act: adicionar produtos, fazer o checkout e pagar
        carrinho.adicionarProdutoAoCarrinho(1);
        carrinho.adicionarProdutoAoCarrinho(2);
        carrinho.acessarCarrinho();
        carrinho.validarCarrinhoComProdutos(2);
        carrinho.prosseguirParaCheckout();
        checkout.validarEnderecoERevisaoDoPedido(usuario);
        checkout.fazerPedido('Pedido de teste automatizado - PGATS');
        checkout.pagarPedido(pagamento.cartao);

        // assert
        checkout.validarPedidoConfirmado();

        // Limpeza: excluir a conta
        cadastro.excluirConta();
        cadastro.validarContaExcluida();
        cadastro.continuar();
    });

    it('TC16 - deve fazer pedido fazendo login antes do checkout', () => {
        const usuario = usuarios.usuarioCadastro;
        const email = `pgats+${Date.now()}@teste.com`;

        // arrange: ter um usuário cadastrado e deslogado
        cadastro.cadastrarUsuario(usuario, email);
        logout.efetuarLogout();

        // act: fazer login, adicionar produtos, fazer o checkout e pagar
        login.acessarLogin();
        login.efetuarLogin(email, usuario.senha);
        login.validarUsuarioLogado(usuario.nome);
        carrinho.adicionarProdutoAoCarrinho(1);
        carrinho.adicionarProdutoAoCarrinho(2);
        carrinho.acessarCarrinho();
        carrinho.validarCarrinhoComProdutos(2);
        carrinho.prosseguirParaCheckout();
        checkout.validarEnderecoERevisaoDoPedido(usuario);
        checkout.fazerPedido('Pedido de teste automatizado - PGATS');
        checkout.pagarPedido(pagamento.cartao);

        // assert
        checkout.validarPedidoConfirmado();

        // limpeza: excluir a conta
        cadastro.excluirConta();
        cadastro.validarContaExcluida();
        cadastro.continuar();
    });
});