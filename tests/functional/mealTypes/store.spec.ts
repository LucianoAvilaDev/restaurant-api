import { Group, test } from '@japa/runner'
import { GenerateRandomEmail } from 'App/Functions/GenerateRandomEmail'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'

test.group('Meal Types store', (group: Group) => {

  group.tap((test) => test.tags([
    '@store',
    '@mealTypes',
    '@mealTypes_store',
  ]))

  const url: string = '/api/meal-types'
  const urlLogin: string = '/api/login'

  test('(general) SHOULD store new meal type with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
    })

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT store new meal type without having permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "notmeal@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
    })

    response.assertStatus(403)
  })

  test('(general) SHOULD NOT store new meal type without being authenticated', async ({ client }) => {

    const response = await client.post(url).json({
      name: GenerateRandomString(10),
    })

    response.assertStatus(401)
  })

  test('(name) SHOULD NOT store new meal type without name', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      name: undefined
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT store new meal type with name shorter than 6 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(5),
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT store new mealType with name greater than 100 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(101),
    })

    response.assertStatus(422)
  })

})
