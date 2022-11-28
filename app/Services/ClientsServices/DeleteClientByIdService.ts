import Client from "App/Models/Client"
import { ServiceReturnType } from "App/Types/types"
import GetClientWithRelationsByIdService from "./GetClientWithRelationsByIdService"

export default class DeleteClientByIdService {

  public static async run(id: Number): Promise<ServiceReturnType> {

    const returnObject: ServiceReturnType = await GetClientWithRelationsByIdService.run(id as number)

    if (!returnObject.object)
      return {
        message: returnObject.message,
        success: false,
        object: null
      }

    const client = returnObject.object as Client

    if (client.$hasRelated('orders'))
      return {
        message: "Esse Cliente está sendo usado por um ou mais Pedidos.",
        success: false,
        object: null
      }

    await client.delete()

    return {
      object: Client,
      message: "Cliente excluído com sucesso!",
      success: true
    }

  }
}
