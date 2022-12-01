import Order from 'App/Models/Order'
import OpenOrderService from 'App/Services/OrdersServices/OpenOrderService'
import BookTableService from 'App/Services/TablesServices/BookTableService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OpenOrderController {

  public async handle({ params, response }: HttpContextContract) {

    try {

      const orderId: number = params.id

      const orderToOpen: Order = await Order.findOrFail(orderId)

      const tableId: number = orderToOpen.tableId

      await OpenOrderService.run(orderId)

      await BookTableService.run(tableId)

      return response.ok('Pedido aberto com sucesso')

    }

    catch (e: any) {

      throw e

    }

  }

}
