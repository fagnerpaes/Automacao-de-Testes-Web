const cadastro = require('../modules/cadastro/cadastro');
const login = require('../modules/login/login');
const logout = require('../modules/logout/logout');
const usuarios = require('../fixtures/usuarios.json');

describe('Logout de usuário', () => {
    it('TC4 - deve deslogar o usuário', () => {
        const usuario = usuarios.usuarioCadastro;
        const email = `pgats+${Date.now()}@teste.com`;

        // arrange: criar a conta e sair
        cadastro.cadastrarUsuario(usuario, email);
        logout.efetuarLogout();

        // act: fazer login, conferir que entrou e clicar em Logout
        login.acessarLogin();
        login.efetuarLogin(email, usuario.senha);
        login.validarUsuarioLogado(usuario.nome);
        logout.efetuarLogout();

        // assert: conferir que saiu
        logout.validarUsuarioDeslogado();
    });
});