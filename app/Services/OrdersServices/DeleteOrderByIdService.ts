import Order from "App/Models/Order"
import { ServiceReturnType } from "App/Types/types"
import GetOrderWithRelationsByIdService from "./GetOrderWithRelationsByIdService"

export default class DeleteOrderByIdService {

  public static async run(id: Number): Promise<ServiceReturnType> {

    const returnObject: ServiceReturnType = await GetOrderWithRelationsByIdService.run(id as number)

    if (!returnObject.object)
      return {
        message: returnObject.message,
        success: false,
        object: null
      }

    const order = returnObject.object as Order

    await order.delete()

    return {
      object: order,
      message: "Pedido excluído com sucesso!",
      success: true
    }

  }
}
