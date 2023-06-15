import { expect, it, beforeAll, afterAll, describe } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new transaction', async () => {
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

  it('should be able to list all transactions', async () => {
    const createTransactionsResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New trasaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionsResponse.get('Set-cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New trasaction',
        amount: 5000,
      }),
    ])
  })
})
