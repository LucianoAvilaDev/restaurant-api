import { Group, test } from '@japa/runner'

test.group('Users delete', (group: Group) => {

  group.tap((test) => test.tags([
    '@delete',
    '@users',
    '@users_delete'
  ]))

  const urlNotDelete: string = '/api/users/3'
  const urlDelete: string = '/api/users/4'

  test('(general) SHOULD delete user with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(urlDelete).header('authorization', token)

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT delete user without having permission', async ({ client }) => {

    const responseToken = await client.post('/api/login').json({
      email: "notuser@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(urlNotDelete).header('authorization', token)

    response.assertStatus(403)

  })

  test('(general) SHOULD NOT update user without being authenticated', async ({ client }) => {

    const response = await client.delete(urlNotDelete)

    response.assertStatus(401)

  })

})
