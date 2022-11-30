import { Group, test } from '@japa/runner'

test.group('Auth login', (group: Group) => {

  group.tap((test) => test.tags(['@login']))

  test('should login successfully', async ({ client }) => {
    const response = await client.post('/api/login').json({
      email: "luciano.diniz@sagatechbrasil.com.br",
      password: "123456",
    })

    response.assertStatus(200)
  })

})
