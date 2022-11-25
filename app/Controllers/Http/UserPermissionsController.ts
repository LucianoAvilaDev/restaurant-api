// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GetCurrentUserPermissionsService } from "App/Services/UsersServices/GetCurrentUserPermissionsService";


export default class UserPermissionsController {

  public async handle({ auth }: HttpContextContract) {

    return GetCurrentUserPermissionsService(auth)

  }

}
