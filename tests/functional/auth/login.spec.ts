import { Group, test } from '@japa/runner'

test.group('Auth login', (group: Group) => {

  group.tap((test) => test.tags([
    '@auth',
    '@login'
  ]))

  test('SHOULD login successfully', async ({ client }) => {
    const response = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    response.assertStatus(200)
  })

})
