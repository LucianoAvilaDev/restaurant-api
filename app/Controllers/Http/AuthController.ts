import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

  public async Login({ request, auth, response }: HttpContextContract) {

    try {
      const [email, password] = [request.input('email'), request.input('password')]

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '30 mins'
      })

      return response.ok(token.toJSON())
    }
    catch (e: any) {
      throw new Error(e.message)
    }

  }

  public async Logout({ auth, response }: HttpContextContract) {

    try {

      await auth.use('api').logout()

      return response.ok('Usuário deslogado com sucesso!')

    }
    catch (e: any) {
      throw new Error(e.message)
    }

  }

}

