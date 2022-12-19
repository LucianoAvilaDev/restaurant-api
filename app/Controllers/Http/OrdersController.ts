import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import Order from 'App/Models/Order'
import BookTableService from 'App/Services/TablesServices/BookTableService'
import CheckBookedTableService from 'App/Services/TablesServices/CheckBookedTableService'
import ReleaseTableService from 'App/Services/TablesServices/ReleaseTableService'
import OrdersValidator from 'App/Validators/OrdersValidator'

export default class OrdersController {

  private ordersValidator: any
  private ordersSchema: any
  private ordersMessages: CustomMessages

  public async index({ response }: HttpContextContract) {

    try {

      const orders: Order[] = await Order.query().preload('table').preload('client')

      return response.ok(orders)

    }

    catch (e: any) {

      throw e

    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      this.ordersValidator = new OrdersValidator()

      this.ordersSchema = this.ordersValidator.ordersSchema
      this.ordersMessages = this.ordersValidator.ordersMessages


      const payload: Order = await request.validate({ schema: this.ordersSchema, messages: this.ordersMessages })

      const isTableAvailable: boolean = await CheckBookedTableService.run(request.body().tableId)

      if (!isTableAvailable)
        return response.badRequest('Mesa indisponível!')

      const order: Order = await Order.create(payload)

      if (order.isClosed)
        await ReleaseTableService.run(order.tableId)

      else
        await BookTableService.run(order.tableId)

      return response.ok(order)

    }
    catch (e: any) {
      throw e
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const order: Order = await Order.query().preload('table').preload('client').preload('orderItems', (query: any) => {
        query.preload('meal')
      }).where('id', params.id).firstOrFail()

      return response.ok(order)

    }
    catch (e: any) {
      throw e
    }

  }

  public async update({ request, params, response }) {

    try {

      this.ordersValidator = new OrdersValidator()

      this.ordersSchema = this.ordersValidator.ordersSchema
      this.ordersMessages = this.ordersValidator.ordersMessages

      const payload: Order = await request.validate({ schema: this.ordersSchema, messages: this.ordersMessages })

      const isTableAvailable: boolean = await CheckBookedTableService.run(request.body().tableId)

      if (!isTableAvailable)
        return response.badRequest('Mesa indisponível!')

      const existingOrder: Order = await Order.findOrFail(params.id)

      existingOrder.date = payload.date
      existingOrder.totalValue = payload.totalValue
      existingOrder.paidValue = payload.paidValue
      existingOrder.clientId = payload.clientId
      existingOrder.tableId = payload.tableId
      existingOrder.isClosed = payload.isClosed

      const updatedOrder: Order = await existingOrder.save()

      if (updatedOrder.isClosed)
        await ReleaseTableService.run(updatedOrder.tableId)

      else
        await BookTableService.run(updatedOrder.tableId)

      return response.ok(updatedOrder)

    }

    catch (e: any) {

      throw e

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const order: Order = await Order.findOrFail(params.id)

      await order.delete()

      return response.ok(order)

    }

    catch (e: any) {

      throw e

    }
  }
}
