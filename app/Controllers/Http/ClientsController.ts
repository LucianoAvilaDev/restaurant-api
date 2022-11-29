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
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (e: any) {
      return response.internalServerError(`Houve um erro: ${e.message}`)
    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await CreateClientService.run(request)

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (e: any) {
      return response.internalServerError(`Houve um erro: ${e.message}`)
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await GetClientByIdService.run(params.id)

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (e: any) {
      return response.internalServerError(`Houve um erro: ${e.message}`)
    }

  }

  public async update({ request, params, response }) {

    try {

      const returnObject: ServiceReturnType = await UpdateClientByIdService.run(params.id, request)

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (e: any) {

      return response.internalServerError(`Houve um erro: ${e.message}`)

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await DeleteClientByIdService.run(params.id)

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (err: unknown) {

      return err

    }
  }
}
