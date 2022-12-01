import { Group, test } from '@japa/runner'

test.group('clients delete', (group: Group) => {

  group.tap((test) => test.tags([
    '@delete',
    '@clients',
    '@clients_delete'
  ]))

  const loginUrl: string = '/api/login'
  const deleteUrl: string = '/api/clients/3'

  test('(general) SHOULD delete client with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(loginUrl).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(deleteUrl).header('authorization', token)

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT delete client without having permission', async ({ client }) => {

    const responseToken = await client.post(loginUrl).json({
      email: "notclient@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(deleteUrl).header('authorization', token)

    response.assertStatus(403)

  })

  test('(general) SHOULD NOT update client without being authenticated', async ({ client }) => {

    const response = await client.delete(deleteUrl)

    response.assertStatus(401)

  })

})
