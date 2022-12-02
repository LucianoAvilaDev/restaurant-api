import { Group, test } from '@japa/runner'

test.group('Auth recovery', (group: Group) => {

  group.tap((test) => test.tags([
    '@auth',
    '@recover'
  ]))

  test('SHOULD receive recovery password email ', async ({ client }) => {
    const response = await client.post('/api/recovery').json({
      email: "admin.sgs@sagatech.com.br",
    })

    response.assertStatus(200)
  })

  test('SHOULD NOT proceed with wrong email', async ({ client }) => {
    const response = await client.post('/api/recovery').json({
      email: "errado@sagatech.com.br",
    })

    response.assertStatus(400)
  })

})
