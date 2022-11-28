import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateClientService from 'App/Services/ClientsServices/CreateClientService'
import DeleteClientByIdService from 'App/Services/ClientsServices/DeleteClientByIdService'
import GetAllClientsService from 'App/Services/ClientsServices/GetAllClientsService'
import GetClientByIdService from 'App/Services/ClientsServices/GetClientByIdService'
import UpdateClientByIdService from 'App/Services/ClientsServices/UpdateClientByIdService'
import { ServiceReturnType } from 'App/Types/types'

export default class ClientsController {

  public async index({ response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await GetAllClientsService.run()

      if (!returnObject.success)
        throw new Error(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (error: any) {
      return error
    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await CreateClientService.run(request)

      if (!returnObject.success)
        throw new Error(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (error: any) {
      return error
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await GetClientByIdService.run(params.id)

      if (!returnObject.success)
        throw new Error(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (error: any) {
      return error
    }

  }

  public async update({ request, params, response }) {

    try {

      const returnObject: ServiceReturnType = await UpdateClientByIdService.run(params.id, request)

      if (!returnObject.success)
        throw new Error(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (error: any) {

      return error

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await DeleteClientByIdService.run(params.id)

      if (!returnObject.success)
        throw new Error(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (err: unknown) {

      return err

    }
  }
}
