const cadastro = require('../modules/cadastro/cadastro');
const login = require('../modules/login/login');
const logout = require('../modules/logout/logout');
const usuarios = require('../fixtures/usuarios.json');

describe('Login de usuário', () => {
    it('TC2 - deve logar com e-mail e senha corretos', () => {
        const usuario = usuarios.usuarioCadastro;
        const email = `pgats+${Date.now()}@teste.com`;

        // Preparação: cria um usuário e sai da conta
        cadastro.cadastrarUsuario(usuario, email);
        logout.efetuarLogout();

        // Cenário do TC2
        login.acessarLogin();
        login.efetuarLogin(email, usuario.senha);
        login.validarUsuarioLogado(usuario.nome);
        cadastro.excluirConta();
        cadastro.validarContaExcluida();
    });

    it('TC3 - não deve logar com e-mail e senha incorretos', () => {
        login.acessarLogin();
        login.efetuarLogin('naoexiste@teste.com', 'senhaErrada123');
        login.validarMensagemDeErroLogin();
    });
});