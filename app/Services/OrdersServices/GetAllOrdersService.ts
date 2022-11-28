import Order from "App/Models/Order"
import { ServiceReturnType } from "App/Types/types"

export default class GetAllOrdersService {
  public static async run(): Promise<ServiceReturnType> {

    const orders: Order[] = await Order.query().preload('client').preload('table')

    return {
      message: 'Sucesso',
      success: true,
      object: orders
    }

  }
}
