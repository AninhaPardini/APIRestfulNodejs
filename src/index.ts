import fastify from 'fastify'

const app = fastify()

app.get('/hello', () => {
  return 'Hello World'
})

app
  .listen({
    port: 3000, // Promisse
  })
  .then(() => {
    // Quando terminar de executar a promisse:
    console.log('Ta funcionando carai!')
  })
