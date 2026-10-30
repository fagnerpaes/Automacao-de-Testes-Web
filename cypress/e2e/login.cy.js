const login = require('../modules/login/login');

describe('Login de usuário', () => {
    it('TC3 - não deve logar com e-mail e senha incorretos', () => {
        login.acessarLogin();
        login.efetuarLogin('naoexiste@teste.com', 'senhaErrada123');
        login.validarMensagemDeErroLogin();
    });
});