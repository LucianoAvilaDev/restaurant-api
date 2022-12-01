import { Group, test } from '@japa/runner'

test.group('tables delete', (group: Group) => {

  group.tap((test) => test.tags([
    '@delete',
    '@tables',
    '@tables_delete'
  ]))

  const urlLogin: string = '/api/login'

  const urlNotDelete: string = '/api/tables/1'

  const urlDelete: string = '/api/tables/4'

  test('(general) SHOULD delete table with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(urlDelete).header('authorization', token)

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT update table without being authenticated', async ({ client }) => {

    const response = await client.delete(urlNotDelete)

    response.assertStatus(401)

  })

  test('(general) SHOULD NOT delete table with Orders relation', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(urlNotDelete).header('authorization', token)

    response.assertStatus(400)
  })

})
