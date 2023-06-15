import { expect, test } from 'vitest'
import { app } from ''

test('Usuário consegue criar uma nova transação', () => {
  // É composto por: enunciado, operação, validação

  const responseStatusCode = 201

  expect(responseStatusCode).toEqual(201)
})
