// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import UsersValidator from 'App/Validators/UsersValidator'

export default class SaveUserAfterResetPasswordController {

  private usersValidator: any
  private usersSchema: any
  private usersMessages: CustomMessages

  public async handle({ request, params, response }: HttpContextContract) {

    try {

      this.usersValidator = new UsersValidator(params.id)

      this.usersSchema = this.usersValidator.usersSchema
      this.usersMessages = this.usersValidator.usersMessages

      const payload: User = await request.validate({ schema: this.usersSchema, messages: this.usersMessages })

      const existingUser: User = await User.findOrFail(params.id)

      existingUser.name = payload.name
      existingUser.email = payload.email
      existingUser.password = await Hash.make(payload.password)

      existingUser.roleId = payload.roleId
      existingUser.recoveryToken = null

      const updatedUser: User = await existingUser.save()

      return response.ok(updatedUser)

    }

    catch (e: any) {

      throw (e)

    }

  }

}
