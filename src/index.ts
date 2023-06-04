import fastify from 'fastify'
import { knex } from './database'
import crypto from 'crypto'

const app = fastify()

app.get('/hello', async () => {
  const transactions = await knex('transactions')
    .where('amount', 1000)
    .select('*')

  return transactions
})

app
  .listen({
    port: 3000, // Promisse
  })
  .then(() => {
    // Quando terminar de executar a promisse:
    console.log('Ta funcionando carai!')
  })
