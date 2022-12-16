import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesFiltersController {
  public async handle({ response, request }: HttpContextContract) {

    const { name, permission } = request.body()

    const Roles: Role[] = await Role.query().preload('permissions')
      .if(name, (RoleQuery) => {
        RoleQuery.where('name', "like", `%${name}%`)
      })
      .if(permission, (RoleQuery) => {
        RoleQuery.whereHas('permissions', (permissionQuery: any) => {
          permissionQuery.where('id', permission)
        })
      })

    return response.ok(Roles)
  }
}
