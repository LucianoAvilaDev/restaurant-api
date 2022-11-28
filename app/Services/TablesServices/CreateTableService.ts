import Table from "App/Models/Table"
import { ServiceReturnType } from "App/Types/types"
import TablesValidator from "App/Validators/TablesValidator"

export default class CreateTableService {
  public static async run(request: any): Promise<ServiceReturnType> {

    try {

      const tablesSchema = TablesValidator.tablesSchema
      const tablesMessages = TablesValidator.tablesMessages

      const payload = await request.validate(tablesSchema, tablesMessages)

      const table: Table = await Table.create(payload)

      return {
        message: "Mesa cadastrado com Sucesso",
        success: true,
        object: table
      }

    }

    catch (e: any) {
      return {
        success: true,
        message: e.message,
        object: null
      }

    }

  }
}
