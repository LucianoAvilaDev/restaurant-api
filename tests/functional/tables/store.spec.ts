import { Group, test } from '@japa/runner'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'

test.group('Tables store', (group: Group) => {

  group.tap((test) => test.tags([
    '@store',
    '@tables',
    '@tables_store',
  ]))

  const url: string = '/api/tables'
  const urlLogin: string = '/api/login'

  const testtable: any = {
    number: GenerateRandomString(10),
    isAvailable: true
  }

  test('(general) SHOULD store new table with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testtable
    })

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT store new table without being authenticated', async ({ client }) => {

    const response = await client.post(url).json({
      ...testtable
    })

    response.assertStatus(401)
  })

  test('(number) SHOULD NOT store new table without number', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testtable,
      number: undefined
    })

    response.assertStatus(422)
  })

  test('(number) SHOULD NOT store new table with number shorter than 1 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      ...testtable,
      number: ""
    })

    response.assertStatus(422)
  })

  test('(number) SHOULD NOT store new table with number greater than 10 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testtable,
      number: GenerateRandomString(11),
    })

    response.assertStatus(422)
  })

  test('(isAvailable) SHOULD NOT store new table without isAvailable', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testtable,
      isAvailable: undefined,
    })

    response.assertStatus(422)
  })

})
