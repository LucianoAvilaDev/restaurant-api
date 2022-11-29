import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateOrderItemService from 'App/Services/OrderItemsServices/CreateOrderItemService'
import DeleteOrderItemByIdService from 'App/Services/OrderItemsServices/DeleteOrderItemByIdService'
import GetAllOrderItemsService from 'App/Services/OrderItemsServices/GetAllOrderItemsService'
import GetOrderItemByIdService from 'App/Services/OrderItemsServices/GetOrderItemByIdService'
import UpdateOrderItemByIdService from 'App/Services/OrderItemsServices/UpdateOrderItemByIdService'
import { ServiceReturnType } from 'App/Types/types'

export default class OrderItemsController {

  public async index({ response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await GetAllOrderItemsService.run()

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

      const returnObject: ServiceReturnType = await CreateOrderItemService.run(request)

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

      const returnObject: ServiceReturnType = await GetOrderItemByIdService.run(params.id)

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

      const returnObject: ServiceReturnType = await UpdateOrderItemByIdService.run(params.id, request)

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

      const returnObject: ServiceReturnType = await DeleteOrderItemByIdService.run(params.id)

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (err: unknown) {

      return err

    }
  }
}
