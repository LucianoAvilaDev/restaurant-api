import { Group, test } from '@japa/runner'
import { GenerateRandomEmail } from 'App/Functions/GenerateRandomEmail'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'

test.group('Meal Types update', async (group: Group) => {

  group.tap((test) => test.tags([
    '@update',
    '@mealTypes',
    '@mealTypes_update'
  ]))

  const urlEdit: string = '/api/meal-types/3'
  const urlLogin: string = '/api/login'

  test('(general) SHOULD update mealType with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(10),
    })

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT update mealType without having permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "notmeal@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(10),
    })

    response.assertStatus(403)
  })

  test('(general) SHOULD NOT update mealType without being authenticated', async ({ client }) => {

    const response = await client.put(urlEdit).json({
      name: GenerateRandomString(10),
    })

    response.assertStatus(401)
  })

  test('(name) SHOULD NOT update mealType without name', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(urlEdit).header('authorization', token).json({
      name: undefined
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT update meal type with name shorter than 6 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(5)
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT update meal type with name greater than 100 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(101),
    })

    response.assertStatus(422)
  })

})
