import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import OrderItem from 'App/Models/OrderItem'
import OrderItemsValidator from 'App/Validators/OrderItemsValidator'

export default class OrderItemsController {

  private orderItemsSchema: any = OrderItemsValidator.orderItemsSchema
  private orderItemsMessages: CustomMessages = OrderItemsValidator.orderItemsMessages

  public async index({ response }: HttpContextContract) {

    try {

      const orderItems: OrderItem[] = await OrderItem.query().preload('meal')

      return response.ok(orderItems)

    }

    catch (e: any) {

      throw new Error(e)

    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      const payload: OrderItem = await request.validate({ schema: this.orderItemsSchema, messages: this.orderItemsMessages })

      const orderItem: OrderItem = await OrderItem.create(payload)

      return response.ok(orderItem)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const orderItem: OrderItem = await OrderItem.query().preload('meal').where(params.id).firstOrFail()

      return response.ok(OrderItem)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

  public async update({ request, params, response }) {

    try {

      const payload: any = await request.validate({ schema: this.orderItemsSchema, messages: this.orderItemsMessages })

      const existingOrderItem: OrderItem = await OrderItem.findOrFail(params.id)

      existingOrderItem.observation = payload.observation
      existingOrderItem.quantity = payload.quantity
      existingOrderItem.price = payload.price
      existingOrderItem.mealId = payload.mealId


      const updatedOrderItem: OrderItem = await existingOrderItem.save()

      return response.ok(updatedOrderItem)

    }

    catch (e: any) {

      throw new Error(e)

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const orderItem: OrderItem = await OrderItem.findOrFail(params.id)

      await orderItem.delete()

      return response.ok(orderItem)

    }

    catch (e: any) {

      throw new Error(e)

    }
  }
}
