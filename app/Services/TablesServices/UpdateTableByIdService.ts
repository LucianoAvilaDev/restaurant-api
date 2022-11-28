import Table from "App/Models/Table"
import { ServiceReturnType } from "App/Types/types"
import TableValidator from "App/Validators/TablesValidator"
import GetTableByIdService from "./GetTableByIdService"

export default class UpdateTableByIdService {

  public static async run(id: Number, request: any): Promise<ServiceReturnType> {

    const tablesSchema = TableValidator.tablesSchema
    const tablesMessages = TableValidator.tablesMessages

    const payload: any = await request.validate(tablesSchema, tablesMessages)

    const returnObject: ServiceReturnType = await GetTableByIdService.run(id as number)

    if (!returnObject.success)
      throw new Error(returnObject.message)

    const existingTable: Table = returnObject.object as Table

    existingTable.number = payload.number
    existingTable.isAvailable = payload.isAvailable

    existingTable.save()

    return {
      success: true,
      object: existingTable,
      message: "Mesa excluída com sucesso"
    }

  }
}
