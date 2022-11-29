import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import UsersValidator from 'App/Validators/UsersValidator'
export default class UsersController {

  private usersSchema: any = UsersValidator.usersSchema
  private usersMessages: CustomMessages = UsersValidator.usersMessages

  public async index({ response }: HttpContextContract) {

    try {

      const Users: User[] = await User.query().preload('role')

      return response.ok(Users)

    }

    catch (e: any) {

      throw new Error(e)

    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      const payload = await request.validate({ schema: this.usersSchema, messages: this.usersMessages })

      const user: User = await User.create(payload as User)

      return response.ok(user)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const user: User = await User.query().preload('role').where(params.id).firstOrFail()

      return response.ok(user)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

  public async update({ request, params, response }) {

    try {

      const payload: any = await request.validate({ schema: this.usersSchema, messages: this.usersMessages })

      const existingUser: User = await User.findOrFail(params.id)

      existingUser.name = payload.name
      existingUser.email = payload.email
      existingUser.password = payload.password
      existingUser.roleId = payload.roleId

      const updatedUser: User = await existingUser.save()

      return response.ok(updatedUser)

    }

    catch (e: any) {

      throw new Error(e)

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const user: User = await User.findOrFail(params.id)

      await user.delete()

      return response.ok(user)

    }

    catch (e: any) {

      throw new Error(e)

    }
  }

}

