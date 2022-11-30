import { Group, test } from '@japa/runner'
import { GenerateRandomEmail } from 'App/Functions/GenerateRandomEmail'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'

test.group('Users store', (group: Group) => {

  group.tap((test) => test.tags(['@user_store']))

  const url: string = '/api/users'

  test('(general) should store new user with correct informations and permissions', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
      roleId: 1
    })

    response.assertStatus(200)
  })

  test('(general) should not store new user without having permission', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "collab.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
      roleId: 1
    })

    response.assertStatus(403)
  })

  test('(general) should not store new user without being authenticated', async ({ client }) => {

    const response = await client.post(url).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
      roleId: 1
    })

    response.assertStatus(401)
  })

  test('(name) should not store new user without name', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
      roleId: 1
    })

    response.assertStatus(422)
  })

  test('(name) should not store new user with name shorter than 6 chars', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(5),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
      roleId: 1
    })

    response.assertStatus(422)
  })

  test('(name) should not store new user with name greater than 200 chars', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(201),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
      roleId: 1
    })

    response.assertStatus(422)
  })

  test('(email) should not store new user with duplicated email', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: "admin.sgs@sagatech.com.br",
      password: GenerateRandomString(8),
      roleId: 1
    })

    response.assertStatus(422)
  })

  test('(email) should not store new user without email', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      password: GenerateRandomString(8),
      roleId: 1
    })

    response.assertStatus(422)
  })

  test('(email) should not store new user with invalid email (without @)', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: "dededsagatech.com.br",
      password: GenerateRandomString(8),
      roleId: 1
    })

    response.assertStatus(422)
  })

  test('(email) should not store new user with invalid email (without .com or .anything)', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: "dededs@sagatechbr",
      password: GenerateRandomString(8),
      roleId: 1
    })

    response.assertStatus(422)
  })

  test('(password) should not store new user without password', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      roleId: 1
    })

    response.assertStatus(422)
  })

  test('(password) should not store new user with password shorter than 6 chars', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(5),
      roleId: 1
    })

    response.assertStatus(422)
  })

  test('(password) should not store new user with password greater than 100 chars', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(101),
      roleId: 1
    })

    response.assertStatus(422)
  })

  test('(roleId) should not store new user without roleId', async ({ client }) => {

    const rsp = await client.post('/api/login').json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${rsp.body().token}`


    const response = await client.post(url).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
    })

    response.assertStatus(422)
  })

})
