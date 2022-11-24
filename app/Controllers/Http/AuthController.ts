// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

  public async login({ request, auth, response }: HttpContextContract) {

    try {
      const [email, password] = [request.input('email'), request.input('password')]

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '30 mins'
      })

      return token.toJSON()
    }
    catch (e: any) {
      return response.internalServerError(e.message)
    }

  }

}

