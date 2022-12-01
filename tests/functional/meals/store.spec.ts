import { Group, test } from '@japa/runner'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'

test.group('Meals store', (group: Group) => {

  group.tap((test) => test.tags([
    '@store',
    '@meals',
    '@meals_store',
  ]))

  const url: string = '/api/meals'
  const urlLogin: string = '/api/login'

  const testMeal: any = {
    name: GenerateRandomString(10),
    description: GenerateRandomString(10),
    price: 10,
    mealTypeId: 1
  }

  test('(general) SHOULD store new meal with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testMeal
    })

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT store new meal  without having permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "notmeal@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testMeal
    })

    response.assertStatus(403)
  })

  test('(general) SHOULD NOT store new meal  without being authenticated', async ({ client }) => {

    const response = await client.post(url).json({
      ...testMeal
    })

    response.assertStatus(401)
  })

  test('(name) SHOULD NOT store new meal  without name', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testMeal,
      name: undefined
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT store new meal  with name shorter than 6 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      ...testMeal,
      name: GenerateRandomString(5)
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT store new meal with name greater than 100 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testMeal,
      name: GenerateRandomString(101),
    })

    response.assertStatus(422)
  })

  test('(description) SHOULD NOT store new meal with description greater than 300 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testMeal,
      description: GenerateRandomString(301),
    })

    response.assertStatus(422)
  })

  test('(description) SHOULD store new meal with empty string description', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testMeal,
      description: '',
    })

    response.assertStatus(422)
  })

  test('(description) SHOULD store new meal without description', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testMeal,
      description: undefined,
    })

    response.assertStatus(422)
  })

  test('(price) SHOULD NOT store new meal with price lower than 0.01 ', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testMeal,
      price: 0.0,
    })

    response.assertStatus(422)
  })

  test('(price) SHOULD NOT store new meal with price higher than 99999999.99 ', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testMeal,
      price: 199999999.99,
    })

    response.assertStatus(422)
  })

  test('(mealTypeId) SHOULD NOT store new meal without mealTypeId ', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testMeal,
      mealTypeId: undefined,
    })

    response.assertStatus(422)
  })

})
