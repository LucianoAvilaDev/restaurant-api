import { Group, test } from '@japa/runner'

test.group('Users delete', (group: Group) => {

  group.tap((test) => test.tags(['@user_delete']))

  const url: string = '/api/users/3'

  test('(general) SHOULD delete user with correct informations and permissions', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`

    const response = await client.delete(url).header('authorization', token)

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT delete user without having permission', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "collab.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`

    const response = await client.delete(url).header('authorization', token)

    response.assertStatus(403)
  })

  test('(general) SHOULD NOT update user without being authenticated', async ({ client }) => {

    const response = await client.delete(url)

    response.assertStatus(401)
  })

})
