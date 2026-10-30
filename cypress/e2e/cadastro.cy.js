const cadastro = require('../modules/cadastro/cadastro');
const login = require('../modules/login/login');          // ← adicione esta linha
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
});