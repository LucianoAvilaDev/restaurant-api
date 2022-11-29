import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateOrderService from 'App/Services/OrdersServices/CreateOrderService'
import DeleteOrderByIdService from 'App/Services/OrdersServices/DeleteOrderByIdService'
import GetAllOrdersService from 'App/Services/OrdersServices/GetAllOrdersService'
import GetOrderByIdService from 'App/Services/OrdersServices/GetOrderByIdService'
import UpdateOrderByIdService from 'App/Services/OrdersServices/UpdateOrderByIdService'
import { ServiceReturnType } from 'App/Types/types'

export default class OrdersController {

  public async index({ response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await GetAllOrdersService.run()

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

      const returnObject: ServiceReturnType = await CreateOrderService.run(request)

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

      const returnObject: ServiceReturnType = await GetOrderByIdService.run(params.id)

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

      const returnObject: ServiceReturnType = await UpdateOrderByIdService.run(params.id, request)

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

      const returnObject: ServiceReturnType = await DeleteOrderByIdService.run(params.id)

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (err: unknown) {

      return err

    }
  }
}
