# Automação de Testes Web – Automation Exercise

[![Testes E2E](https://github.com/fagnerpaes/Automacao-de-Testes-Web/actions/workflows/testes-e2e.yml/badge.svg)](https://github.com/fagnerpaes/Automacao-de-Testes-Web/actions/workflows/testes-e2e.yml)

Testes automatizados E2E com **Cypress** para a aplicação [Automation Exercise](https://automationexercise.com), desenvolvidos como trabalho final da disciplina **Automação de Testes na Camada de Interface Web** (PGATS).

## Casos de teste

| ID | Cenário | Spec |
|---|---|---|
| TC1 | Register User | `cadastro.cy.js` |
| TC2 | Login User with correct email and password | `login.cy.js` |
| TC3 | Login User with incorrect email and password | `login.cy.js` |
| TC4 | Logout User | `logout.cy.js` |
| TC5 | Register User with existing email | `cadastro.cy.js` |
| TC8 | Verify All Products and product detail page | `produto.cy.js` |
| TC9 | Search Product | `produto.cy.js` |
| TC10 | Verify Subscription in home page | `assinatura.cy.js` |
| TC15 | Place Order: Register before Checkout | `pedido.cy.js` |
| TC16 | Place Order: Login before Checkout | `pedido.cy.js` |

Descrição completa dos cenários: [Test Cases](https://automationexercise.com/test_cases).

## Tecnologias

- [Cypress](https://www.cypress.io/) 13.7.3
- [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter) (relatórios)
- GitHub Actions (integração contínua)

## Pré-requisitos

- [Node.js](https://nodejs.org/) 22 ou superior
- [Git](https://git-scm.com/)

## Instalação

```bash
git clone https://github.com/fagnerpaes/Automacao-de-Testes-Web.git
cd Automacao-de-Testes-Web
npm install
```

## Execução

| Comando | Descrição |
|---|---|
| `npm test` | Executa todos os testes em modo headless |
| `npm run cy:open` | Abre a interface interativa do Cypress |
| `npx cypress run --spec cypress/e2e/login.cy.js` | Executa uma spec específica |

## Relatório

Após `npm test`, o relatório HTML é gerado em:

```
cypress/reports/html/index.html
```

Ele contém o resumo da execução, o tempo de cada teste e as screenshots das falhas.

## Integração contínua

O workflow `.github/workflows/testes-e2e.yml` executa os testes:

- automaticamente a cada `push` na branch `main`;
- manualmente pela aba **Actions → Testes E2E - Automation Exercise → Run workflow**.

O relatório fica disponível para download em **Artifacts**, no final de cada execução.

## Estrutura do projeto

```
cypress/
├── e2e/            # Specs: descrevem os cenários
├── fixtures/       # Dados de teste (usuário e pagamento)
├── modules/        # Ações de negócio, seletores e asserções
│   ├── assinatura/
│   ├── cadastro/
│   ├── login/
│   ├── logout/
│   ├── pedido/
│   └── produto/
└── support/        # Configurações globais
```
