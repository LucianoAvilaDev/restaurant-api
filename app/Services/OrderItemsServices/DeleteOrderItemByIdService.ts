import OrderItem from "App/Models/OrderItem"
import { ServiceReturnType } from "App/Types/types"
import GetOrderItemWithRelationsByIdService from "./GetOrderItemWithRelationsByIdService"

export default class DeleteOrderItemByIdService {

  public static async run(id: Number): Promise<ServiceReturnType> {

    const returnObject: ServiceReturnType = await GetOrderItemWithRelationsByIdService.run(id as number)

    if (!returnObject.object)
      return {
        message: returnObject.message,
        success: false,
        object: null
      }

    const orderItem = returnObject.object as OrderItem

    if (orderItem.$hasRelated('orders'))
      return {
        message: "Esse Item de Pedido está sendo usada em um ou mais Pedidos.",
        success: false,
        object: null
      }

    await orderItem.delete()

    return {
      object: orderItem,
      message: "Item de Pedido excluído com sucesso!",
      success: true
    }

  }
}
