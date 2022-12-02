// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GetCurrentUserPermissionsService from 'App/Services/UsersServices/GetCurrentUserPermissionsService'

export default class GetUserPermissionsController {

  public async handle({ auth }: HttpContextContract) {

    return GetCurrentUserPermissionsService.run(auth)

  }

}
