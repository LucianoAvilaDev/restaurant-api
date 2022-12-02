import { Group, test } from '@japa/runner'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'

test.group('Meal Types update', async (group: Group) => {

  group.tap((test) => test.tags([
    '@update',
    '@roles',
    '@roles_update'
  ]))

  const url: string = '/api/roles/7'
  const urlLogin: string = '/api/login'

  const testRole: any = {
    name: GenerateRandomString(10),
    permissions: [1, 2, 3]
  }

  test('(general) SHOULD update role with correct informations and permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(url).header('authorization', token).json({
      ...testRole
    })

    response.assertStatus(200)
  })

  test('(general) SHOULD NOT update role without having permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "notrole@email.com",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(url).header('authorization', token).json({
      ...testRole,
    })

    response.assertStatus(403)
  })

  test('(general) SHOULD NOT update role without being authenticated', async ({ client }) => {

    const response = await client.put(url).json({
      ...testRole
    })

    response.assertStatus(401)
  })

  test('(name) SHOULD NOT update role without name', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(url).header('authorization', token).json({
      ...testRole,
      name: undefined
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT update role with name shorter than 6 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(url).header('authorization', token).json({
      ...testRole,
      name: GenerateRandomString(5),
    })

    response.assertStatus(422)
  })

  test('(name) SHOULD NOT update role with name greater than 100 chars', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(url).header('authorization', token).json({
      ...testRole,
      name: GenerateRandomString(101),
    })

    response.assertStatus(422)
  })

  test('(permissions) SHOULD update role without any permission', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(url).header('authorization', token).json({
      name: GenerateRandomString(10)
    })

    response.assertStatus(200)
  })

  test('(permissions) SHOULD update role with empty permissions', async ({ client }) => {

    const responseToken = await client.post(urlLogin).json({
      email: "admin.sgs@sagatech.com.br",
      password: "123456",
    })

    const token = `bearer ${responseToken.body().token}`

    const response = await client.put(url).header('authorization', token).json({
      ...testRole,
      permissions: [],
    })

    response.assertStatus(200)
  })
})
