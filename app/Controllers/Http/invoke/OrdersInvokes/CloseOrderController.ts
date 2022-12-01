import Order from 'App/Models/Order'
import CloseOrderService from 'App/Services/OrdersServices/CloseOrderService'
import ReleaseTableService from 'App/Services/TablesServices/ReleaseTableService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CloseOrderController {

  public async handle({ params, response }: HttpContextContract) {

    try {

      const orderId: number = params.id

      const orderToClose: Order = await Order.findOrFail(orderId)

      const tableId: number = orderToClose.tableId

      await CloseOrderService.run(orderId)

      await ReleaseTableService.run(tableId)

      return response.ok('Pedido fechado com sucesso')

    }

    catch (e: any) {

      throw e

    }

  }

}
