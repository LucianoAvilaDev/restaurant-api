import OrderItem from "App/Models/OrderItem"
import { ServiceReturnType } from "App/Types/types"

export default class GetAllOrderItemsService {
  public static async run(): Promise<ServiceReturnType> {

    const OrderItems: OrderItem[] = await OrderItem.query().preload('meal')

    return {
      message: 'Sucesso',
      success: true,
      object: OrderItems
    }

  }
}
