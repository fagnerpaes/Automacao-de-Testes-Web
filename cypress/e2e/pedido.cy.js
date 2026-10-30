const cadastro = require('../modules/cadastro/cadastro');
const login = require('../modules/login/login');
const logout = require('../modules/logout/logout');
const pedido = require('../modules/pedido/pedido');
const checkout = require('../modules/pedido/checkout');
const usuarios = require('../fixtures/usuarios.json');
const pagamento = require('../fixtures/pagamento.json');

describe('Pedido', () => {
    const produtos = [1, 2];
    const comentario = 'Pedido de teste automatizado - PGATS';

    it('TC15 - deve fazer pedido cadastrando o usuário antes do checkout', () => {
        const usuario = usuarios.usuarioCadastro;
        const email = `pgats+${Date.now()}@teste.com`;

        // arrange: cadastrar o usuário
        cadastro.cadastrarUsuario(usuario, email);
        login.validarUsuarioLogado(usuario.nome);

        // act: comprar os produtos
        pedido.comprarProdutos(produtos, usuario, pagamento.cartao, comentario);

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

        // arrange: ter um usuário cadastrado e fazer login
        cadastro.cadastrarUsuario(usuario, email);
        logout.efetuarLogout();
        login.acessarLogin();
        login.efetuarLogin(email, usuario.senha);
        login.validarUsuarioLogado(usuario.nome);

        // act: comprar os produtos
        pedido.comprarProdutos(produtos, usuario, pagamento.cartao, comentario);

        // assert
        checkout.validarPedidoConfirmado();

        // Limpeza: excluir a conta
        cadastro.excluirConta();
        cadastro.validarContaExcluida();
        cadastro.continuar();
    });
});