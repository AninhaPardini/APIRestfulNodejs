import { expect, test, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

test('Usuário consegue criar uma nova transação', async () => {
  // É composto por: enunciado, operação, validação
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'New trasaction',
      amount: 5000,
      type: 'credit',
    })
    .expect(201)
})
