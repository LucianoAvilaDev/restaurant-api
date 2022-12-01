import { Group, test } from '@japa/runner'

test.group('Orders delete', (group: Group) => {

  group.tap((test) => test.tags([
    '@delete',
    '@orders',
    '@orders_delete'
  ]))

  const urlLogin: string = '/api/login'

  const urlNotDelete: string = '/api/orders/1'

  const urlDelete: string = '/api/orders/3'

  test('(general) SHOULD delete order with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(urlDelete).header('authorization', token)

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT update order without being authenticated', async ({ client }) => {

    const response = await client.delete(urlNotDelete)

    response.assertStatus(401)

  })

})
