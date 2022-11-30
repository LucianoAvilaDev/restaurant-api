import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import Role from 'App/Models/Role'
import RolesValidator from 'App/Validators/RolesValidator'

export default class RolesController {

  private rolesValidator: any
  private rolesSchema: any
  private rolesMessages: CustomMessages

  public async index({ response }: HttpContextContract) {

    try {

      const Roles: Role[] = await Role.query().preload('permissions')

      return response.ok(Roles)

    }

    catch (e: any) {

      throw e

    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      this.rolesValidator = new RolesValidator()

      this.rolesSchema = this.rolesValidator.rolesSchema
      this.rolesMessages = this.rolesValidator.rolesMessages

      const payload: Role = await request.validate({ schema: this.rolesSchema, messages: this.rolesMessages })

      const createdRole: Role = await Role.create(payload)

      createdRole.related('permissions').sync(request.input('permissions'))

      return response.ok(createdRole)

    }
    catch (e: any) {
      throw e
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const role: Role = await Role.query().preload('permissions').where('id', params.id).firstOrFail()

      return response.ok(role)

    }
    catch (e: any) {
      throw e
    }

  }

  public async update({ request, params, response }) {

    try {

      this.rolesValidator = new RolesValidator()

      this.rolesSchema = this.rolesValidator.rolesSchema
      this.rolesMessages = this.rolesValidator.rolesMessages

      const payload: any = await request.validate({ schema: this.rolesSchema, messages: this.rolesMessages })

      const existingRole: Role = await Role.findOrFail(params.id)

      existingRole.name = payload.name

      const updatedRole: Role = await existingRole.save()

      updatedRole.related('permissions').sync(request.input('permissions'))

      return response.ok(updatedRole)

    }

    catch (e: any) {

      throw e

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const role: Role = await Role.query().preload('users').where('id', params.id).firstOrFail()

      if (role.users.length > 0)
        return response.badRequest("Esse Perfil está um ou mais Usuários")

      await Promise.resolve(role.related('permissions').sync([])).then(async () => {
        await role.delete()
      })

      return response.ok(role)

    }

    catch (e: any) {

      throw e

    }
  }
}
