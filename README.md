# Estudos de API REST com Fastify e Typescript

Aqui se contra meus estudos dentro do curso de Ignite em Nodejs da RocketSeat.

## Requisitios da apliçação

São o escopo do projeto, no que ele se baseia, suas funcionalidades ou não, as regras dele, etc. Neste projeto a aplicação construída será um controle de finanças.

### Requisitos funcionais

[ ] O usuário deve poder criar uma nova transação;
[ ] O usuário deve poder obter um resumo da sua conta;
[ ] O usuário deve poder listar todas as transações que já ocorreram;
[ ] O usuário deve poder visualizar uma transação única;

### Regras de Negócio

[ ] A transação pode ser do tipo crédito que somará ao valor total, ou débito que subtrairá;
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

## Instalando [knex](https://knexjs.org/guide/#node-js)

🗃️ Install: npm i knex sqlite3

Para poder utilizar o knex, fiz um arquivo database onde ele irá tratar os dados e enviar ao arquivo app.db e no index fiz o push da resposta com os dados do arquivo, que a princípio retornou um array vazio.

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

## Tipagens no Knex

Essa configuração é para melhorar o Knex dentro do typescript e é uma boa conduta para identificar os tipos de objetos de uma transação.

💡 Um arquivo de tipagem é preciso adicionar o ".d" de definitions na frente do ".ts".

## Listagem de transações

