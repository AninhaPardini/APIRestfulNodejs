# Estudos de API REST com Fastify e Typescript

Aqui se contra meus estudos dentro do curso de Ignite em Nodejs da RocketSeat.

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

