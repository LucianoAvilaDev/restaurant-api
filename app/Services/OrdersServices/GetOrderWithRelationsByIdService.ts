import Order from "App/Models/Order"
import { ServiceReturnType } from "App/Types/types"

export default class GetOrderWithRelationsByIdService {

  public static async run(id: number): Promise<ServiceReturnType> {

    const order: Order | null = await Order.query().preload('orderItems', (orderItemsQuery) => {
      orderItemsQuery.preload('meal', (mealQuery) => {
        mealQuery.preload('mealType')
      })
    }).preload('table').preload('client').where('id', id).first()

    return {
      message: !order ? " do Pedido não encontrado" : 'Sucesso',
      success: !order ? false : true,
      object: order
    }

  }
}
