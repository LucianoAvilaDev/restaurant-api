import Table from "App/Models/Table"
import { ServiceReturnType } from "App/Types/types"

export default class GetAllTablesService {
  public static async run(): Promise<ServiceReturnType> {

    const tables: Table[] = await Table.query().preload('orders')

    return {
      message: 'Sucesso',
      success: true,
      object: tables
    }

  }
}
