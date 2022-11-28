import Order from "App/Models/Order"
import { ServiceReturnType } from "App/Types/types"

export default class GetOrderByIdService {

  public static async run(id: number): Promise<ServiceReturnType> {

    const order: Order | null = await Order.query().where('id', id).first()

    return {
      message: !order ? "Pedido não encontrado" : 'Sucesso',
      success: !order ? false : true,
      object: order
    }

  }
}
