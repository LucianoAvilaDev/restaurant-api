// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { SmtpMailResponse } from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import SendRecoveryPasswordEmailService from 'App/Services/MailServices/SendRecoveryPasswordEmailService'
import { GenerateRandomString } from 'App/Functions/GenerateRandomString'

export default class MailController {

  public async SendRecoveryEmail({ request, response }: HttpContextContract) {

    try {

      const userEmail: number = request.input('email')

      const userToRecover: User | null = await User.findBy('email', userEmail)

      if (!userToRecover)
        return response.badRequest("Usuário não cadastrado")

      userToRecover.recoveryToken = GenerateRandomString(32)

      await userToRecover.save()

      const link: string = `${process.env.APP_URL_WEB}/recover/${userToRecover.recoveryToken}`

      const mailResponse: SmtpMailResponse = await SendRecoveryPasswordEmailService.run({
        userEmail: userToRecover.email,
        msgLink: link
      })

      return response.ok(mailResponse)
    }
    catch (e: any) {
      throw e
    }

  }
}
