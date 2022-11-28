import Order from "App/Models/Order"
import { ServiceReturnType } from "App/Types/types"
import OrdersValidator from "App/Validators/OrdersValidator"

export default class CreateOrderService {
  public static async run(request: any): Promise<ServiceReturnType> {

    try {

      const ordersSchema = OrdersValidator.ordersSchema
      const ordersMessages = OrdersValidator.ordersMessages

      const payload = await request.validate(ordersSchema, ordersMessages)

      const order: Order = await Order.create(payload)

      return {
        message: "Pedido cadastrado com Sucesso",
        success: true,
        object: order
      }

    }

    catch (e: any) {
      throw new Error(e.message)
    }

  }
}