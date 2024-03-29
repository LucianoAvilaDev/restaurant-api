import { Group, test } from '@japa/runner'
import { GenerateRandomEmail } from 'App/Functions/GenerateRandomEmail'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'
import User from 'App/Models/User'
import UserFactory from 'Database/factories/UserFactory'

test.group('Users update', async (group: Group) => {

  group.tap((test) => test.tags([
    '@update',
    '@users',
    '@users_update'
  ]))

  const urlEdit: string = '/api/users/7'
  const urlLogin: string = '/api/login'

  test('(general) SHOULD update user with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
      roleId: 3
    })

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT update user without having permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "notuser@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
      roleId: 3
    })

    response.assertStatus(403)
  })

  test('(general) SHOULD NOT update user without being authenticated', async ({ client }) => {

    const response = await client.put(urlEdit).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
      roleId: 3
    })

    response.assertStatus(401)
  })

  test('(name) SHOULD NOT update user without name', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(urlEdit).header('authorization', token).json({
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
      roleId: 3
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT update user with name shorter than 6 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(5),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
      roleId: 3
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT update user with name greater than 200 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(201),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
      roleId: 3
    })

    response.assertStatus(422)
  })

  test('(email) SHOULD NOT update user with duplicated email', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: "admin.sgs@sagatech.com.br",
      password: GenerateRandomString(8),
      roleId: 3
    })

    response.assertStatus(422)
  })

  test('(email) SHOULD NOT update user without email', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(10),
      password: GenerateRandomString(8),
      roleId: 3
    })

    response.assertStatus(422)
  })

  test('(email) SHOULD NOT update user with invalid email (without @)', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: "dededsagatech.com.br",
      password: GenerateRandomString(8),
      roleId: 3
    })

    response.assertStatus(422)
  })

  test('(email) SHOULD NOT update user with invalid email (without .com or .anything)', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: "dededs@sagatechbr",
      password: GenerateRandomString(8),
      roleId: 3
    })

    response.assertStatus(422)
  })

  test('(password) SHOULD NOT update user without password', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      roleId: 3
    })

    response.assertStatus(422)
  })

  test('(password) SHOULD NOT update user with password shorter than 6 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(5),
      roleId: 3
    })

    response.assertStatus(422)
  })

  test('(password) SHOULD NOT update user with password greater than 100 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(101),
      roleId: 3
    })

    response.assertStatus(422)
  })

  test('(roleId) SHOULD NOT update user without roleId', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`


    const response = await client.put(urlEdit).header('authorization', token).json({
      name: GenerateRandomString(10),
      email: GenerateRandomEmail(),
      password: GenerateRandomString(8),
    })

    response.assertStatus(422)
  })

})
