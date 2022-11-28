import Order from "App/Models/Order"
import { ServiceReturnType } from "App/Types/types"
import OrderValidator from "App/Validators/OrdersValidator"
import GetOrderByIdService from "./GetOrderByIdService"

export default class UpdateOrderByIdService {

  public static async run(id: Number, request: any): Promise<ServiceReturnType> {

    const OrdersSchema = OrderValidator.ordersSchema
    const OrdersMessages = OrderValidator.ordersMessages

    const payload: any = await request.validate(OrdersSchema, OrdersMessages)

    const returnObject: ServiceReturnType = await GetOrderByIdService.run(id as number)

    if (!returnObject.success)
      return {
        message: returnObject.message,
        success: false,
        object: null
      }

    const existingOrder: Order = returnObject.object as Order

    existingOrder.date = payload.date
    existingOrder.totalValue = payload.totalValue
    existingOrder.paidValue = payload.paidValue
    existingOrder.clientId = payload.clientId
    existingOrder.tableId = payload.tableId

    existingOrder.save()

    return {
      success: true,
      message: "Pedido atualizado com sucesso.",
      object: existingOrder
    }

  }
}
