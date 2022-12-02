import { Group, test } from '@japa/runner'
import { GenerateRandomEmail } from 'App/Functions/GenerateRandomEmail'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'
import User from 'App/Models/User'
import UserFactory from 'Database/factories/UserFactory'

test.group('Users store', (group: Group) => {

  group.tap((test) => test.tags([
    '@store',
    '@users',
    '@users_store',
  ]))

  const url: string = '/api/users'
  const urlLogin: string = '/api/login'

  const createTestUser: Function = async (): Promise<User> => {
    return await UserFactory.makeStubbed()
  }

  test('(general) SHOULD store new user with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...await createTestUser()
    })

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT store new user without having permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "notuser@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...await createTestUser()
    })

    response.assertStatus(403)
  })

  test('(general) SHOULD NOT store new user without being authenticated', async ({ client }) => {

    const response = await client.post(url).json({
      ...await createTestUser()
    })

    response.assertStatus(401)
  })

  test('(name) SHOULD NOT store new user without name', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...await createTestUser(),
      name: undefined
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT store new user with name shorter than 6 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      ...await createTestUser(),
      name: GenerateRandomString(5)
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT store new user with name greater than 200 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      ...await createTestUser(),
      name: GenerateRandomString(201),

    })

    response.assertStatus(422)
  })

  test('(email) SHOULD NOT store new user with duplicated email', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      ...await createTestUser(),
      email: "admin.sgs@sagatech.com.br",
    })

    response.assertStatus(422)
  })

  test('(email) SHOULD NOT store new user without email', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      ...await createTestUser(),
      email: undefined
    })

    response.assertStatus(422)
  })

  test('(email) SHOULD NOT store new user with invalid email (without @)', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      ...await createTestUser(),
      email: "dededsagatech.com.br"
    })

    response.assertStatus(422)
  })

  test('(email) SHOULD NOT store new user with invalid email (without .com or .anything)', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      ...await createTestUser(),
      email: "dededs@sagatechbr"
    })

    response.assertStatus(422)
  })

  test('(password) SHOULD NOT store new user without password', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...await createTestUser(),
      password: undefined
    })

    response.assertStatus(422)
  })

  test('(password) SHOULD NOT store new user with password shorter than 6 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...await createTestUser(),
      password: GenerateRandomString(5)
    })

    response.assertStatus(422)
  })

  test('(password) SHOULD NOT store new user with password greater than 100 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      ...await createTestUser(),
      password: GenerateRandomString(101)
    })

    response.assertStatus(422)
  })

  test('(roleId) SHOULD NOT store new user without roleId', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      ...await createTestUser(),
      roleId: undefined
    })

    await client.post('/api/logout').header('authorization', token)

    response.assertStatus(422)
  })

})
