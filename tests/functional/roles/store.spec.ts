import { Group, test } from '@japa/runner'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'

test.group('Roles store', (group: Group) => {

  group.tap((test) => test.tags([
    '@store',
    '@roles',
    '@roles_store',
  ]))

  const url: string = '/api/roles'
  const urlLogin: string = '/api/login'

  const testRole: any = {
    name: GenerateRandomString(10),
    permissions: [1, 2, 3]
  }

  test('(general) SHOULD store new role with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testRole
    })

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT store new role without having permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "notrole@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testRole,
    })

    response.assertStatus(403)
  })

  test('(general) SHOULD NOT store new role without being authenticated', async ({ client }) => {

    const response = await client.post(url).json({
      ...testRole
    })

    response.assertStatus(401)
  })

  test('(name) SHOULD NOT store new role without name', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testRole,
      name: undefined
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT store new role with name shorter than 6 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testRole,
      name: GenerateRandomString(5),
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT store new role with name greater than 100 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testRole,
      name: GenerateRandomString(101),
    })

    response.assertStatus(422)
  })

  test('(permissions) SHOULD store new role without any permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testRole,
      permissions: undefined
    })

    response.assertStatus(200)
  })

  test('(permissions) SHOULD store new role with empty permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.post(url).header('authorization', token).json({
      ...testRole,
      permissions: [],
    })

    response.assertStatus(200)
  })

})
