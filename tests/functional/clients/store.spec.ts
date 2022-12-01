import { Group, test } from '@japa/runner'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'
import { cpf } from 'cpf-cnpj-validator'

test.group('Clients store', (group: Group) => {

  group.tap((test) => test.tags([
    '@store',
    '@clients',
    '@clients_store'
  ]))

  const url: string = '/api/clients'
  const urlLogin: string = '/api/login'

  test('(general) SHOULD store new client with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      cpf: cpf.generate(),
    })

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT store new client without having permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "notclient@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      cpf: cpf.generate(),
    })

    response.assertStatus(403)
  })

  test('(general) SHOULD NOT store new client without being authenticated', async ({ client }) => {

    const response = await client.post(url).json({
      name: GenerateRandomString(10),
      cpf: cpf.generate(),
    })

    response.assertStatus(401)
  })

  test('(name) SHOULD NOT store new client without name', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      cpf: cpf.generate(),
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT store new client with name shorter than 6 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(5),
      cpf: cpf.generate(),
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT store new client with name greater than 200 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(201),
      cpf: cpf.generate(),
    })

    response.assertStatus(422)
  })

  test('(cpf) SHOULD NOT store new client with duplicated cpf', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      cpf: '11140016601',
    })

    response.assertStatus(422)
  })

  test('(cpf) SHOULD NOT store new client without cpf', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
    })

    response.assertStatus(422)
  })

  test('(cpf) SHOULD NOT store new client with invalid cpf', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      cpf: '00000000000',

    })

    response.assertStatus(422)
  })

})
