import { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {

  public async Login({ request, auth, response }: HttpContextContract) {

    try {
      const [email, password] = [request.input('email'), request.input('password')]

      const token: OpaqueTokenContract<User> = await auth.use('api').attempt(email, password, {
        expiresIn: '30 mins'
      })

      return response.ok(token.toJSON())
    }
    catch (e: any) {
      throw e
    }

  }

  public async Logout({ auth, response }: HttpContextContract) {

    try {

      await auth.use('api').logout()

      return response.ok('Usuário desconectado com sucesso!')

    }
    catch (e: any) {
      throw e
    }

  }

}

