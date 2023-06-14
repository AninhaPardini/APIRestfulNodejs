import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)
app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT, // Promisse
  })
  .then(() => {
    // Quando terminar de executar a promisse:
    console.log('Ta funcionando carai!')
  })
