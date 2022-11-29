import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'

export default class AuthMiddleware {

  protected redirectTo = '/login'

  protected async authenticate(auth: HttpContextContract['auth'], guards: any[]) {

    let guardLastAttempted: string | undefined

    for (let guard of guards) {
      guardLastAttempted = guard

      if (await auth.use(guard).check()) {

        auth.defaultGuard = guard
        return true
      }
    }

    throw new AuthenticationException(
      'Acesso não autorizado!',
      'E_UNAUTHORIZED_ACCESS',
      guardLastAttempted,
      this.redirectTo,
    )
  }

  /**
   * Handle request
   */
  public async handle({ auth, request }: HttpContextContract, next: () => Promise<void>, customGuards: string[]) {

    if (request.headers().token && request.headers().token == process.env.API_TOKEN)
      return await next()

    const guards = customGuards.length ? customGuards : [auth.name]
    await this.authenticate(auth, guards)
    await next()

  }
}
