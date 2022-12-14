import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesFiltersController {
    public async handle({ response, request }: HttpContextContract) {

        const { name } = request.body()

        const Roles: Role[] = await Role.query()
            .if(name, (RoleQuery) => {
                RoleQuery.where('name', "like", `%${name}%`)
            })

        return response.ok(Roles)
    }
}
