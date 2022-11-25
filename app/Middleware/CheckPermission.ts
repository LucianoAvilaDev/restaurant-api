import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GetCurrentUserPermissionsService } from 'App/Services/UsersServices/GetCurrentUserPermissionsService'

export default class CheckPermission {

  public checkPermissions = async (auth: AuthContract, route: any): Promise<boolean> => {

    let contains: boolean = false
    let middlewareIndex: number
    let middlewarePermissions: string[]

    const userPermissions: string[] = await GetCurrentUserPermissionsService(auth)

    return await Promise.resolve(route?.middleware.forEach((middlewareName: string, key: number) => {
      if (middlewareName.includes('can:'))
        middlewareIndex = key
    }))
      .then(async () => {
        if (route?.meta.resolvedMiddleware) {
          middlewarePermissions = route?.meta.resolvedMiddleware[middlewareIndex].args
        }

        return await Promise.resolve(userPermissions.forEach((permission: string) => {
          if (middlewarePermissions.includes(permission))
            contains = true
        }))
          .then(async () => {
            return contains
          })
      })





  }

  public async handle({ route, auth, response }: HttpContextContract, next: () => Promise<void>) {

    const containsPermission: boolean = await this.checkPermissions(auth, route)
    if (!containsPermission)
      return response.forbidden("Permissão negada")

    await next()
  }
}
