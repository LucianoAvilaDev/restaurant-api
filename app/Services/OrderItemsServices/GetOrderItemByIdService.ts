import OrderItem from "App/Models/OrderItem"
import { ServiceReturnType } from "App/Types/types"

export default class GetOrderItemByIdService {

  public static async run(id: number): Promise<ServiceReturnType> {

    const orderItem: OrderItem | null = await OrderItem.query().where('id', id).first()

    return {
      message: !orderItem ? "Item do Pedido não encontrada" : 'Sucesso',
      success: !orderItem ? false : true,
      object: orderItem
    }

  }
}
