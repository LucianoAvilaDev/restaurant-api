import OrderItem from "App/Models/OrderItem"
import { ServiceReturnType } from "App/Types/types"

export default class GetOrderItemWithRelationsByIdService {

  public static async run(id: number): Promise<ServiceReturnType> {

    const orderItem: OrderItem | null = await OrderItem.query().preload('orders').preload('meal').where('id', id).first()

    return {
      message: !orderItem ? "Item do Pedido não encontrado" : 'Sucesso',
      success: !orderItem ? false : true,
      object: orderItem
    }

  }
}
