import { Group, test } from '@japa/runner'

test.group('Meal Types delete', (group: Group) => {

  group.tap((test) => test.tags([
    '@delete',
    '@mealTypes',
    '@mealTypes_delete'
  ]))

  const urlLogin: string = '/api/login'

  const urlNotDelete: string = '/api/meal-types/3'

  const urlDelete: string = '/api/meal-types/4'

  test('(general) SHOULD delete meal Type with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(urlDelete).header('authorization', token)

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT delete meal Type without having permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "notmeal@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.delete(urlNotDelete).header('authorization', token)

    response.assertStatus(403)

  })

  test('(general) SHOULD NOT update meal Type without being authenticated', async ({ client }) => {

    const response = await client.delete(urlNotDelete)

    response.assertStatus(401)

  })

})
