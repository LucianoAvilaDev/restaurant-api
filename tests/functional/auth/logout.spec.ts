import { Group, test } from '@japa/runner'

test.group('Auth logout', (group: Group) => {
  group.tap((test) => test.tags([
    '@auth',
    '@logout'
  ]))

  test('SHOULD logout successfully', async ({ client }) => {

    const responseToken = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post('/api/logout').header('authorization', token)

    response.assertStatus(200)
  })

})
