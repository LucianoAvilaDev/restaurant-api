import OrderItem from "App/Models/OrderItem"
import { ServiceReturnType } from "App/Types/types"
import OrderItemsValidator from "App/Validators/OrderItemsValidator"

export default class CreateOrderItemService {
  public static async run(request: any): Promise<ServiceReturnType> {

    try {

      const OrderItemsSchema = OrderItemsValidator.orderItemsSchema
      const OrderItemsMessages = OrderItemsValidator.orderItemsMessages

      const payload = await request.validate(OrderItemsSchema, OrderItemsMessages)

      const orderItem: OrderItem = await OrderItem.create(payload)

      return {
        message: "Item de pedido cadastrada com Sucesso",
        success: true,
        object: orderItem
      }

    }

    catch (e: any) {
      throw new Error(e.message)
    }

  }
}
