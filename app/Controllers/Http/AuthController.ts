import { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import User from 'App/Models/User'
import GetCurrentUserFullDataService from 'App/Services/UsersServices/GetCurrentUserFullDataService'

export default class AuthController {

  public async Login({ request, auth, response }: HttpContextContract) {

    try {
      const [email, password] = [request.input('email'), request.input('password')]

      const token: OpaqueTokenContract<User> = await auth.use('api').attempt(email, password, {
        expiresIn: '60 mins'
      })

      const currUser: User = await GetCurrentUserFullDataService.run(auth)

      return response.ok({
        token: token.toJSON().token,
        expires: token.toJSON().expires_at,
        user: {
          id: currUser.id,
          name: currUser.name,
          email: currUser.email,
          permissions: currUser.role.permissions.map((permissions: Permission) => {
            return permissions.name
          }),
        }
      })
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

