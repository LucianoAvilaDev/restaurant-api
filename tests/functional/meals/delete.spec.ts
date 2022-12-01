import { Group, test } from '@japa/runner'

test.group('Meals delete', (group: Group) => {

  group.tap((test) => test.tags([
    '@delete',
    '@meals',
    '@meals_delete'
  ]))

  const urlLogin: string = '/api/login'

  const urlNotDelete: string = '/api/meals/3'

  const urlDelete: string = '/api/meals/4'

  test('(general) SHOULD delete meal with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(urlDelete).header('authorization', token)

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT delete meal  without having permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "notmeal@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(urlNotDelete).header('authorization', token)

    response.assertStatus(403)

  })

  test('(general) SHOULD NOT update meal  without being authenticated', async ({ client }) => {

    const response = await client.delete(urlNotDelete)

    response.assertStatus(401)

  })

})
