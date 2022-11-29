import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateRoleService from 'App/Services/RolesServices/CreateRoleService'
import DeleteRoleByIdService from 'App/Services/RolesServices/DeleteRoleByIdService'
import GetAllRolesService from 'App/Services/RolesServices/GetAllRolesService'
import GetRoleByIdService from 'App/Services/RolesServices/GetRoleByIdService'
import UpdateRoleByIdService from 'App/Services/RolesServices/UpdateRoleByIdService'
import { ServiceReturnType } from 'App/Types/types'

export default class RolesController {

  public async index({ response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await GetAllRolesService.run()

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await CreateRoleService.run(request)

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await GetRoleByIdService.run(params.id)

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

  public async update({ request, params, response }) {

    try {

      const returnObject: ServiceReturnType = await UpdateRoleByIdService.run(params.id, request)

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (e: any) {

      throw new Error(e)

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await DeleteRoleByIdService.run(params.id)

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (err: unknown) {

      return err

    }
  }
}
