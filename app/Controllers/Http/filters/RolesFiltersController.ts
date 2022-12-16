import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesFiltersController {
  public async handle({ response, request }: HttpContextContract) {

    const { name } = request.body()

    const roles: Role[] = await Role.query().preload('permissions')
      .if(name, (RoleQuery) => {
        RoleQuery.where('name', "like", `%${name}%`)
      })


    return response.ok(roles)
  }
}
