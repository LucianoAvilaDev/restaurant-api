import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionsController {

  public async index({ response }: HttpContextContract) {

    try {

      const permisssions: Permission[] = await Permission.all()

      return response.ok(permisssions)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

}
