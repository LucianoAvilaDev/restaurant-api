import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GetAllPermissionsService from 'App/Services/PermissionsServices/GetAllPermissionsService'
import { ServiceReturnType } from 'App/Types/types'

export default class PermissionsController {

  public async index({ response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await GetAllPermissionsService.run()

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

}
