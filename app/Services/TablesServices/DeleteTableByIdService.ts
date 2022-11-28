import Table from "App/Models/Table"
import { ServiceReturnType } from "App/Types/types"
import GetTableWithRelationsByIdService from "./GetTableWithRelationsByIdService"

export default class DeleteTableByIdService {

  public static async run(id: Number): Promise<ServiceReturnType> {

    const returnObject: ServiceReturnType = await GetTableWithRelationsByIdService.run(id as number)

    if (!returnObject.object)
      return {
        success: true,
        message: returnObject.message,
        object: null
      }


    const Table = returnObject.object as Table

    if (Table.$hasRelated('orders'))
      return {
        success: true,
        message: "Essa Mesa está sendo usada por um ou mais Pedidos",
        object: null
      }

    await Table.delete()

    return {
      object: Table,
      message: "Mesa excluída com sucesso!",
      success: true
    }

  }
}
