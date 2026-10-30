const assinatura = require('../modules/assinatura/assinatura');

describe('Assinatura de newsletter', () => {
    it('TC10 - deve assinar a newsletter pela página inicial', () => {
        const email = `pgats+${Date.now()}@teste.com`;

        assinatura.acessarPaginaInicial();
        assinatura.rolarAteRodape();
        assinatura.validarSecaoAssinaturaVisivel();
        assinatura.assinarNewsletter(email);
        assinatura.validarAssinaturaRealizada();
    });
});