import Order from "App/Models/Order"
import { ServiceReturnType } from "App/Types/types"
import OrdersValidator from "App/Validators/OrdersValidator"

export default class CreateOrderService {
  public static async run(request: any): Promise<ServiceReturnType> {

    try {

      const ordersSchema = OrdersValidator.ordersSchema
      const ordersMessages = OrdersValidator.ordersMessages

      const payload = await request.validate({ schema: ordersSchema, messages: ordersMessages })

      const order: Order = await Order.create(payload)

      return {
        message: "Pedido cadastrado com Sucesso",
        success: true,
        object: order
      }

    }

    catch (e: any) {
      return {
        message: e.message,
        success: false,
        object: null
      }
    }

  }
}
