import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import UsersValidator from 'App/Validators/UsersValidator'
export default class UsersController {

  private usersValidator: any
  private usersSchema: any
  private usersMessages: CustomMessages

  public async index({ response }: HttpContextContract) {

    try {

      const Users: User[] = await User.query().preload('role')

      return response.ok(Users)

    }

    catch (e: any) {

      throw e

    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      this.usersValidator = new UsersValidator(0)

      this.usersSchema = this.usersValidator.usersSchema
      this.usersMessages = this.usersValidator.usersMessages

      const payload = await request.validate({ schema: this.usersSchema, messages: this.usersMessages })

      const user: User = await User.create({ ...payload, password: await Hash.make(payload.password) } as User)

      return response.ok(user)

    }
    catch (e: any) {
      throw (e)
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const user: User = await User.query().preload('role').where('id', params.id).firstOrFail()

      return response.ok(user)

    }
    catch (e: any) {
      throw e
    }

  }

  public async update({ request, params, response }: HttpContextContract) {

    try {

      this.usersValidator = new UsersValidator(params.id)

      this.usersSchema = this.usersValidator.usersSchema
      this.usersMessages = this.usersValidator.usersMessages

      const payload: User = await request.validate({ schema: this.usersSchema, messages: this.usersMessages })

      const existingUser: User = await User.findOrFail(params.id)

      const defaultPassword: string = "******";

      existingUser.name = payload.name
      existingUser.email = payload.email
      existingUser.password = payload.password == defaultPassword ? existingUser.password : await Hash.make(payload.password)

      existingUser.roleId = payload.roleId

      const updatedUser: User = await existingUser.save()

      return response.ok(updatedUser)

    }

    catch (e: any) {

      throw (e)

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const user: User = await User.findOrFail(params.id)

      await user.delete()

      return response.ok(user)

    }

    catch (e: any) {

      throw e

    }
  }

}

