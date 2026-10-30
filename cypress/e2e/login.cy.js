const cadastro = require('../modules/cadastro/cadastro');
const login = require('../modules/login/login');
const logout = require('../modules/logout/logout');
const usuarios = require('../fixtures/usuarios.json');

describe('Login de usuário', () => {
    it('TC2 - deve logar com e-mail e senha corretos', () => {
        const usuario = usuarios.usuarioCadastro;
        const email = `pgats+${Date.now()}@teste.com`;

        //arrange: ter uma conta e estar deslogado
        cadastro.cadastrarUsuario(usuario, email);
        logout.efetuarLogout();

         //act: fazer o login
        login.acessarLogin();
        login.efetuarLogin(email, usuario.senha);
        login.validarUsuarioLogado(usuario.nome);

        // Limpeza: o TC2 pede para excluir a conta
        cadastro.excluirConta();
        cadastro.validarContaExcluida();
    });

    it('TC3 - não deve logar com e-mail e senha incorretos', () => {
        login.acessarLogin();
        login.efetuarLogin('naoexiste@teste.com', 'senhaErrada123');
        login.validarMensagemDeErroLogin();
    });
});