import OrderItem from "App/Models/OrderItem"
import { ServiceReturnType } from "App/Types/types"
import GetOrderItemWithRelationsByIdService from "./GetOrderItemWithRelationsByIdService"

export default class DeleteOrderItemByIdService {

  public static async run(id: Number): Promise<ServiceReturnType> {

    const returnObject: ServiceReturnType = await GetOrderItemWithRelationsByIdService.run(id as number)

    if (!returnObject.object)
      throw new Error(returnObject.message)

    const OrderItem = returnObject.object as OrderItem

    if (OrderItem.$hasRelated('orders'))
      throw new Error(returnObject.message)

    await OrderItem.delete()

    return {
      object: OrderItem,
      message: "Refeição excluída com sucesso!",
      success: true
    }

  }
}
