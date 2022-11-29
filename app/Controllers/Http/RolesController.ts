import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import Role from 'App/Models/Role'
import RolesValidator from 'App/Validators/RolesValidator'

export default class RolesController {

  private rolesSchema: any = RolesValidator.rolesSchema
  private rolesMessages: CustomMessages = RolesValidator.rolesMessages

  public async index({ response }: HttpContextContract) {

    try {

      const Roles: Role[] = await Role.query().preload('permissions')

      return response.ok(Roles)

    }

    catch (e: any) {

      throw new Error(e)

    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      const payload: Role = await request.validate({ schema: this.rolesSchema, messages: this.rolesMessages })

      payload.related('permissions').attach(request.input('permissions'))

      const createdRole: Role = await Role.create(payload)

      return response.ok(createdRole)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const role: Role = await Role.query().preload('permissions').where(params.id).firstOrFail()

      return response.ok(role)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

  public async update({ request, params, response }) {

    try {

      const payload: any = await request.validate({ schema: this.rolesSchema, messages: this.rolesMessages })

      const existingRole: Role = await Role.findOrFail(params.id)

      existingRole.name = payload.name
      existingRole.related('permissions').sync(request.input('permissions'))

      const updatedRole: Role = await existingRole.save()

      return response.ok(updatedRole)

    }

    catch (e: any) {

      throw new Error(e)

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const role: Role = await Role.query().preload('users').where(params.id).firstOrFail()

      if (role.$hasRelated('users'))
        return response.badRequest("Esse Perfil está um ou mais Usuários")

      await role.delete()

      return response.ok(role)

    }

    catch (e: any) {

      throw new Error(e)

    }
  }
}
