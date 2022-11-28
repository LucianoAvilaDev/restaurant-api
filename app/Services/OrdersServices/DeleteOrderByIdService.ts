import Order from "App/Models/Order"
import { ServiceReturnType } from "App/Types/types"
import GetOrderWithRelationsByIdService from "./GetOrderWithRelationsByIdService"

export default class DeleteOrderByIdService {

  public static async run(id: Number): Promise<ServiceReturnType> {

    const returnObject: ServiceReturnType = await GetOrderWithRelationsByIdService.run(id as number)

    if (!returnObject.object)
      throw new Error(returnObject.message)

    const order = returnObject.object as Order

    await order.delete()

    return {
      object: order,
      message: "Pedido excluída com sucesso!",
      success: true
    }

  }
}
