import { Group, test } from '@japa/runner'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'
import Table from 'App/Models/Table'
import { DateTime } from 'luxon'

test.group('orderItems store', (group: Group) => {

  group.tap((test) => test.tags([
    '@store',
    '@orderItems',
    '@orderItems_store',
  ]))

  const url: string = '/api/order-items'
  const urlLogin: string = '/api/login'

  const testOrderItem: any = {
    observation: GenerateRandomString(100),
    clientId: 1,
    quantity: 4.00,
    price: 22.00,
    mealId: 1,
    orderId: 1
  }

  test('(general) SHOULD store new orderItem with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testOrderItem
    })

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT store new orderItem without having permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "notorder@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testOrderItem
    })

    response.assertStatus(403)
  })

  test('(general) SHOULD NOT store new orderItem without being authenticated', async ({ client }) => {

    const response = await client.post(url).json({
      ...testOrderItem
    })

    response.assertStatus(401)
  })

  test('(mealId) SHOULD NOT store new orderItem without mealId', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testOrderItem,
      mealId: undefined
    })

    response.assertStatus(422)
  })

  test('(orderId) SHOULD NOT store new orderItem without orderId', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testOrderItem,
      orderId: undefined,
    })

    response.assertStatus(422)
  })

  test('(price) SHOULD NOT store new orderItem without price', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testOrderItem,
      price: undefined
    })

    response.assertStatus(422)
  })

  test('(price) SHOULD NOT store new orderItem with price lower than 0.01', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testOrderItem,
      price: 0.00
    })

    response.assertStatus(422)
  })

  test('(price) SHOULD NOT store new orderItem with price higher than 99999999.99', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testOrderItem,
      price: 199999999.99
    })

    response.assertStatus(422)
  })

  test('(quantity) SHOULD NOT store new orderItem without quantity', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testOrderItem,
      quantity: undefined
    })

    response.assertStatus(422)
  })

  test('(quantity) SHOULD NOT store new orderItem with quantity lower than 0.01', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testOrderItem,
      quantity: 0.0
    })

    response.assertStatus(422)
  })

  test('(quantity) SHOULD NOT store new orderItem with quantity higher than 999999.99', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testOrderItem,
      quantity: 1000000.00
    })

    response.assertStatus(422)
  })

})
