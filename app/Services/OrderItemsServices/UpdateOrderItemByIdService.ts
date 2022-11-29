import OrderItem from "App/Models/OrderItem"
import { ServiceReturnType } from "App/Types/types"
import OrderItemValidator from "App/Validators/OrderItemsValidator"
import GetOrderItemByIdService from "./GetOrderItemByIdService"

export default class UpdateOrderItemByIdService {

  public static async run(id: Number, request: any): Promise<ServiceReturnType> {

    const orderItemsSchema = OrderItemValidator.orderItemsSchema
    const orderItemsMessages = OrderItemValidator.orderItemsMessages

    const payload: any = await request.validate({ schema: orderItemsSchema, messages: orderItemsMessages })

    const returnObject: ServiceReturnType = await GetOrderItemByIdService.run(id as number)

    if (!returnObject.success)
      return {
        message: returnObject.message,
        success: false,
        object: null
      }

    const existingOrderItem: OrderItem = returnObject.object as OrderItem

    existingOrderItem.observation = payload.observation
    existingOrderItem.quantity = payload.quantity
    existingOrderItem.price = payload.price
    existingOrderItem.mealId = payload.mealId

    existingOrderItem.save()

    return {
      success: true,
      message: "Item do Pedido atualizado com sucesso.",
      object: existingOrderItem
    }

  }
}
