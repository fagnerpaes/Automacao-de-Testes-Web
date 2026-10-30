const cadastro = require('../modules/cadastro/cadastro');
const login = require('../modules/login/login');
const logout = require('../modules/logout/logout');
const usuarios = require('../fixtures/usuarios.json');

describe('Cadastro de usuário', () => {
    it('TC1 - deve cadastrar um novo usuário', () => {
        const usuario = usuarios.usuarioCadastro;
        const email = `pgats+${Date.now()}@teste.com`;

        cadastro.acessarPaginaDeCadastro();
        cadastro.iniciarCadastro(usuario.nome, email);
        cadastro.preencherDadosDaConta(usuario);
        cadastro.preencherEndereco(usuario);
        cadastro.criarConta();
        cadastro.validarContaCriada();     
        cadastro.continuar();
        login.validarUsuarioLogado(usuario.nome);
        cadastro.excluirConta();
        cadastro.validarContaExcluida();
        cadastro.continuar();   
    });

    it('TC5 - não deve cadastrar usuário com e-mail já existente', () => {
        const usuario = usuarios.usuarioCadastro;
        const email = `pgats+${Date.now()}@teste.com`;

        // arrange: criar um usuário e sair
        cadastro.cadastrarUsuario(usuario, email);
        logout.efetuarLogout();

        // act: tentar cadastrar de novo com o mesmo e-mail
        cadastro.acessarPaginaDeCadastro();
        cadastro.iniciarCadastro(usuario.nome, email);

        // assert
        cadastro.validarMensagemEmailExistente();
    });


});