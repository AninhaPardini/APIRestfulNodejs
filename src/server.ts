import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT, // Promisse
  })
  .then(() => {
    // Quando terminar de executar a promisse:
    console.log('HTTP Server Running!')
  })
