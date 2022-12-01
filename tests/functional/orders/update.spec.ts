import { Group, test } from '@japa/runner'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'
import { DateTime } from 'luxon'

test.group('order update', async (group: Group) => {

  group.tap((test) => test.tags([
    '@update',
    '@orders',
    '@orders_update'
  ]))

  const url: string = '/api/orders/2'
  const urlLogin: string = '/api/login'

  const testOrder: any = {
    date: DateTime.now(),
    clientId: 1,
    tableId: 1,
    totalValue: 232.00,
    paidValue: 232.00,
    isClosed: false
  }

  test('(general) SHOULD update order with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const responseNewTable: any = await client.post('/api/tables').header('authorization', token).json({
      number: GenerateRandomString(9),
      isAvailable: true
    })

    const tableId: number = responseNewTable.body().id

    const response = await client.put(url).header('authorization', token).json({
      ...testOrder,
      tableId: tableId
    })

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT update order without having permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "notorder@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const responseNewTable: any = await client.post('/api/tables').header('authorization', token).json({
      number: GenerateRandomString(9),
      isAvailable: true
    })

    const tableId: number = responseNewTable.body().id

    const response = await client.put(url).header('authorization', token).json({
      ...testOrder,
      tableId: tableId
    })

    response.assertStatus(403)
  })

  test('(general) SHOULD NOT update order without being authenticated', async ({ client }) => {

    const response = await client.put(url).json({
      ...testOrder
    })

    response.assertStatus(401)
  })

  test('(date) SHOULD NOT update order without date', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const responseNewTable: any = await client.post('/api/tables').header('authorization', token).json({
      number: GenerateRandomString(9),
      isAvailable: true
    })

    const tableId: number = responseNewTable.body().id

    const response = await client.put(url).header('authorization', token).json({
      ...testOrder,
      tableId: tableId,
      date: undefined
    })

    response.assertStatus(422)
  })

  test('(clientId) SHOULD NOT update order without clientId', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const responseNewTable: any = await client.post('/api/tables').header('authorization', token).json({
      number: GenerateRandomString(9),
      isAvailable: true
    })

    const tableId: number = responseNewTable.body().id

    const response = await client.put(url).header('authorization', token).json({
      ...testOrder,
      tableId: tableId,
      clientId: undefined
    })

    response.assertStatus(422)
  })

  test('(tableId) SHOULD NOT update order without tableId', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(url).header('authorization', token).json({
      ...testOrder,
      tableId: undefined,
    })

    response.assertStatus(422)
  })

  test('(tableId) SHOULD NOT update order wit booked tableId', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(url).header('authorization', token).json({
      ...testOrder,
      tableId: 1,
    })

    response.assertStatus(400)
  })

  test('(totalValue) SHOULD NOT update order without totalValue', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const responseNewTable: any = await client.post('/api/tables').header('authorization', token).json({
      number: GenerateRandomString(9),
      isAvailable: true
    })

    const tableId: number = responseNewTable.body().id

    const response = await client.put(url).header('authorization', token).json({
      ...testOrder,
      tableId: tableId,
      totalValue: undefined
    })

    response.assertStatus(422)
  })

  test('(totalValue) SHOULD NOT update order with totalValue lower than 0.0', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const responseNewTable: any = await client.post('/api/tables').header('authorization', token).json({
      number: GenerateRandomString(9),
      isAvailable: true
    })

    const tableId: number = responseNewTable.body().id

    const response = await client.put(url).header('authorization', token).json({
      ...testOrder,
      tableId: tableId,
      totalValue: -0.01
    })

    response.assertStatus(422)
  })

  test('(totalValue) SHOULD NOT update order with totalValue higher than 99999999.99', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const responseNewTable: any = await client.post('/api/tables').header('authorization', token).json({
      number: GenerateRandomString(9),
      isAvailable: true
    })

    const tableId: number = responseNewTable.body().id

    const response = await client.put(url).header('authorization', token).json({
      ...testOrder,
      tableId: tableId,
      totalValue: 199999999.99
    })

    response.assertStatus(422)
  })

  test('(paidValue) SHOULD NOT update order without paidValue', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const responseNewTable: any = await client.post('/api/tables').header('authorization', token).json({
      number: GenerateRandomString(9),
      isAvailable: true
    })

    const tableId: number = responseNewTable.body().id

    const response = await client.put(url).header('authorization', token).json({
      ...testOrder,
      tableId: tableId,
      paidValue: undefined
    })

    response.assertStatus(422)
  })

  test('(paidValue) SHOULD NOT update order with paidValue lower than 0.0', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const responseNewTable: any = await client.post('/api/tables').header('authorization', token).json({
      number: GenerateRandomString(9),
      isAvailable: true
    })

    const tableId: number = responseNewTable.body().id

    const response = await client.put(url).header('authorization', token).json({
      ...testOrder,
      tableId: tableId,
      paidValue: -0.01
    })

    response.assertStatus(422)
  })

  test('(paidValue) SHOULD NOT update order with paidValue higher than 99999999.99', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const responseNewTable: any = await client.post('/api/tables').header('authorization', token).json({
      number: GenerateRandomString(9),
      isAvailable: true
    })

    const tableId: number = responseNewTable.body().id

    const response = await client.put(url).header('authorization', token).json({
      ...testOrder,
      tableId: tableId,
      paidValue: 199999999.99
    })

    response.assertStatus(422)
  })

  test('(isClosed) SHOULD NOT update order without isClosed', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const responseNewTable: any = await client.post('/api/tables').header('authorization', token).json({
      number: GenerateRandomString(9),
      isAvailable: true
    })

    const tableId: number = responseNewTable.body().id

    const response = await client.put(url).header('authorization', token).json({
      ...testOrder,
      tableId: tableId,
      isClosed: undefined
    })

    response.assertStatus(422)
  })

})
