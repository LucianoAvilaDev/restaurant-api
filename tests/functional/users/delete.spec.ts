import { Group, test } from '@japa/runner'
import { GenerateRandomEmail } from 'App/Functions/GenerateRandomEmail'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'

test.group('Users delete', (group: Group) => {

  group.tap((test) => test.tags([
    '@delete',
    '@users',
    '@users_delete'
  ]))

  const url: string = '/api/users/3'

  test('(general) SHOULD delete user with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const responseToGetId = await client.post('/api/users').header('authorization', token).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
      roleId: 1
    })

    const id = responseToGetId.body().id

    const response = await client.delete(`/api/users/${id}`).header('authorization', token)

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT delete user without having permission', async ({ client }) => {

    const responseToken = await client.post('/api/login').json({
      email: "collab.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(url).header('authorization', token)

    response.assertStatus(403)

  })

  test('(general) SHOULD NOT update user without being authenticated', async ({ client }) => {

    const response = await client.delete(url)

    response.assertStatus(401)

  })

})
