import { Group, test } from '@japa/runner'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'

test.group('table update', async (group: Group) => {

  group.tap((test) => test.tags([
    '@update',
    '@tables',
    '@tables_update'
  ]))

  const url: string = '/api/tables/3'
  const urlLogin: string = '/api/login'

  const testTable: any = {
    number: GenerateRandomString(10),
    isAvailable: true
  }

  test('(general) SHOULD update table with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(url).header('authorization', token).json({
      ...testTable
    })

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT update table without being authenticated', async ({ client }) => {

    const response = await client.put(url).json({
      ...testTable
    })

    response.assertStatus(401)
  })

  test('(number) SHOULD NOT update table without number', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(url).header('authorization', token).json({
      ...testTable,
      number: undefined
    })

    response.assertStatus(422)
  })

  test('(number) SHOULD NOT update table with number shorter than 1 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.put(url).header('authorization', token).json({
      ...testTable,
      number: ''
    })

    response.assertStatus(422)
  })

  test('(number) SHOULD NOT update table with number greater than 10 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(url).header('authorization', token).json({
      ...testTable,
      number: GenerateRandomString(11),
    })

    response.assertStatus(422)
  })

  test('(isAvailable) SHOULD NOT update table without isAvailable', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(url).header('authorization', token).json({
      ...testTable,
      isAvailable: undefined
    })

    response.assertStatus(422)
  })

})
