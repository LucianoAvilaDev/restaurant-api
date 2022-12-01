import { Group, test } from '@japa/runner'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'
import { cpf } from 'cpf-cnpj-validator'

test.group('clients delete', (group: Group) => {

  group.tap((test) => test.tags([
    '@delete',
    '@clients',
    '@clients_delete'
  ]))

  const url: string = '/api/clients'

  test('(general) SHOULD delete client with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const responseToGetId = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      cpf: cpf.generate(),
    })

    const id = responseToGetId.body().id

    const response = await client.delete(`${url}/${id}`).header('authorization', token)

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT delete client without having permission', async ({ client }) => {

    const responseToken = await client.post('/api/login').json({
      email: "collab.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const responseToGetId = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      cpf: cpf.generate(),
    })

    const id = responseToGetId.body().id

    const response = await client.delete(`${url}/${id}`).header('authorization', token)

    response.assertStatus(403)

  })

  test('(general) SHOULD NOT update client without being authenticated', async ({ client }) => {

    const response = await client.delete(url)

    response.assertStatus(401)

  })

})
