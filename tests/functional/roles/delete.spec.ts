import { Group, test } from '@japa/runner'

test.group('Roles delete', (group: Group) => {

  group.tap((test) => test.tags([
    '@delete',
    '@roles',
    '@roles_delete'
  ]))

  const urlLogin: string = '/api/login'

  const urlNotDelete: string = '/api/roles/7'

  const urlDelete: string = '/api/roles/8'

  test('(general) SHOULD delete role with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(urlDelete).header('authorization', token)

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT delete role without having permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "notrole@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(urlNotDelete).header('authorization', token)

    response.assertStatus(403)

  })

  test('(general) SHOULD NOT update role without being authenticated', async ({ client }) => {

    const response = await client.delete(urlNotDelete)

    response.assertStatus(401)

  })

})
