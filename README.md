# Estudos de API REST com Fastify e Typescript

Aqui se contra meus estudos dentro do curso de Ignite em Nodejs da RocketSeat.

## Requisitios da apliçação

São o escopo do projeto, no que ele se baseia, suas funcionalidades ou não, as regras dele, etc. Neste projeto a aplicação construída será um controle de finanças.

### Requisitos funcionais

[x] O usuário deve poder criar uma nova transação;
[ ] O usuário deve poder obter um resumo da sua conta;
[x] O usuário deve poder listar todas as transações que já ocorreram;
[x] O usuário deve poder visualizar uma transação única;

### Regras de Negócio

[x] A transação pode ser do tipo crédito que somará ao valor total, ou débito que subtrairá;
[ ] Deve ser possível identificarmos o usuário entre as requisições;
[ ] O usuário só pode visualizar transações o qual ele criou;

### Requisitos não funcionais

[ ]

## Entendendo o Typescript

Como determinar os tipos de cada objeto?

type or interface são os metodos usados para tipar e sua estrutura é:

    inferface objetoType {
        item1: number,
        item2: string,
        item3obrigatório?: boolean,
    }

Dentro de uma função ele é inserido assim:

    function example(objeto: objetoType) {

    }

📥 Install: npm i -D typescript
📥 Install: npm i -D tsx
🗃️ Init: npx tsc --init
🔁 tsconfig: target to es2022

## Instalando fastify

📥 Install: npm i fastify

Fiz o primeiro Hello world em typescript e usei o comando npx tsc src/index.ts para converter em um novo arquivo em js para conferir, só que a forma como ele converteu a porta está incorreta e não foi reconhecida na versão nova do es2022, então tive que alterar para app.listen('port', (3000)) para funcionar.

Depois exclui o js e mudei para rodar o node em ts, com um ajuste no package.json onde tem que rodar o tsx --watch com o caminho para funcionar.

🗃️ Install: npm i eslint @rocketseat/eslint-config -D
🗂️ Package.json: "lint": "eslint src --ext .ts --fix"

### Plugins do Fastify

O puglin precisa ser uma função assincrona e para conectar ele ao server é só usar app.register('nome_da_função').

A como criar prefixos também para facilitar o código para todos os pós / serão de transactions.

### Plugins Globais

Cada plugin tem seu contexto própio ou seja, tudo que tem dentro de um plugin não interfere em outro e vise versa. Com isso é usado o hook podemos globalizar.

## Cookies no Fastify

É uma forma e manter o contexto entre requisições.

no path, a rota colocada será a que poerá acessar os cookies, então quando está só /, quer dizer que qualquer rota pode acessar os cookies.

⬇️Install: npm i @fastify/cookie

## Criando Middlers e definindo uma pré Handler

É importante criar intercepitadores que fazem checagem do algum requisito para poder puxar alguma requisição, neste caso é a checagem se há sessionId(cookie) na procura de transições, com isto separei a checagem num arquivo e exportei a função como preHandler em array dentro de cada metódo.

## Instalando [knex](https://knexjs.org/guide/#node-js)

🗃️ Install: npm i knex sqlite3

Para poder utilizar o knex, fiz um arquivo database onde ele irá tratar os dados e enviar ao arquivo app.db e no index fiz o push da resposta com os dados do arquivo, que a princípio retornou um array vazio.

## Tipagens no Knex

Essa configuração é para melhorar o Knex dentro do typescript e é uma boa conduta para identificar os tipos de objetos de uma transação.

💡 Um arquivo de tipagem é preciso adicionar o ".d" de definitions na frente do ".ts".

### Criando migrate

Além do git, o mais recomendado para gerenciamento de versões em nodejs / knex é o migrate, para poder usar o migrate é necessário uma gambiarra:

1- Em database tirar as configurações de dentro do setupKnex e coloca-las em uma const;
2 - Criar um arquivo knexfile.ts e importar a config;
3 - package.json: em script adicionar "knex": "node --loader tsx ./node_modules/.bin/knex"
4 - 🗃️ Create migrate: npm run knex -- migrate:make create-documents

Para poder ter acesso as interfaces e estruturas de config do migrate, tive que exportar em database o Knex, e defini o migrations para ts e sua pasta de criação.

Dentro do documento criado de migration, existe duas funções, o up, que significa o que aquela versão irá fazer, e o down se der caquinha em alguma coisa e ele irá fazer o contrário do que o método up fez. Exemplo:

🆙 Criei uma table
⬇️ Remove a tabela

🔀 Utilizar a ultima migration: npm run knex -- migrate:latest
⚠️ Uma vez utilizando a migration, ela não pode ser editada(caso seja enviada para produção), é cessário criar uma nova migration se for necessário editar o nome do campo ou alguma informação.

📝 Para editar a última migration é só dar npm run knex -- migrate:rollback
🗂️ Timestramp para registrar a criação dos dados coletados.

### Acessando o banco de dados

Para acessar dentro do index como GET, tenho que chamar dentro de uma variante, com a mesma forma que fiz no migration.

Para procurar na tabela:
await knex('nome da tabela').onde('nome do campo', valor).selecionar('')

Para inserir na tabela:
await knex('transactions').insert({
id: crypto.randomUUID(),
title: '',
amount: valor,
})

## Variáveis de ambiente

Utilizamosw o dotenv para amazenar informações sensíveis e criei um .env.example para treinar a boa contuda de código deixando uma base para se eu tivesse um companheiro de equipe.

### Tratando com zod as variáveis (validação de dados)

Para evitar a poluição de código com os ifs, usarei o zod que é uma biblioteca para testar as keys.

💡 Schema é formato que serão recebidos de dados das váriaveis de ambiente
💡 Parse: pega os dados de uma variante e faz a validação com o zod se bate com o que foi dado como parâmetro. Neste caso ele pega o envSchema e usa como base para validar o process.env

## Criação de transações

request.body = todo o corpo da página HTTP e server pra criar ou editar algum recurso.

💡 Facilitando: Uma forma de converter de forma mais facil quando for credito ou debito uma transação, quando a opção selecionada for débito, irá fazer uma multiplicação de -1 para transforma-lo em negativo.

## Listagem de transações

Defini para que o get buscasse todas as transações e também um apenas para buscar um transação com id específico usando zod.

para ver a soma de um campo de números, neste caso o amount, a função sum é empregada e tem como configura-lá para dar um titúlo ao resultado usando o "as".

## Automatizando com teste

### Tipos de testes

- Unitários: unidade da aplicação, uma pequena parte de forma totalmente isolada~, tipo de teste mais utilizado;
- Integração: comunicação entre duas ou mais unidades;
- E2E Ponta a ponta: simulam um usuário operando na nossa aplicação;
    - e2e front-end: abre a página de login, digita o texto no campo com ID email, clique no botão
    - e2e back-end: chamados HTTP, websockets

💡 Entender a piramide de teste

O usado neste projeto é o [Vitest](https://vitest.dev/) e para utilizar ele e a maioria dos frameworks de teste, se intala e cria uma pasta para os arquivos de teste.

🧪 Para iniciar o teste é: npx vitest
⌨️ "A" para rodar todos os testes novamente
🔁 No package mudou para npm test

Para rodar os testes com melhor performace sem precisar lançar o server no ar é usado o supertest como depêndencia.

⬇️ npm i supertest -D
⬇️ npm i -D @types/supertest

Dentro dos testes tem as separações de quando quero que o teste execute:

 - beforeAll: Antes de todos os códigos rodarem
 - beforeEach: Antes de cada um
 - afterAll: Depois de todos
 - afterEach: Depois de cada um

 💡 Categorizando os testes: basta usar describe e colocar o código de teste abaixo.