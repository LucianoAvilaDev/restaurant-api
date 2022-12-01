import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import Order from 'App/Models/Order'
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

      const order: Order = await Order.create(payload)

      return response.ok(order)

    }
    catch (e: any) {
      throw e
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const order: Order = await Order.query().preload('table').preload('client').preload('orderItems').where('id', params.id).firstOrFail()

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

      const existingOrder: Order = await Order.findOrFail(params.id)

      existingOrder.date = payload.date
      existingOrder.totalValue = payload.totalValue
      existingOrder.paidValue = payload.paidValue
      existingOrder.clientId = payload.clientId
      existingOrder.tableId = payload.tableId
      existingOrder.isClosed = payload.isClosed

      const updatedOrder: Order = await existingOrder.save()

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
