import { Group, test } from '@japa/runner'

test.group('orderItems delete', (group: Group) => {

  group.tap((test) => test.tags([
    '@delete',
    '@orderItems',
    '@orderItems_delete'
  ]))

  const urlLogin: string = '/api/login'

  const urlNotDelete: string = '/api/order-items/1'

  const urlDelete: string = '/api/order-items/3'

  test('(general) SHOULD delete orderItem with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(urlDelete).header('authorization', token)

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT update orderItem without being authenticated', async ({ client }) => {

    const response = await client.delete(urlNotDelete)

    response.assertStatus(401)

  })

})
