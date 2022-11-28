import Table from "App/Models/Table"
import { ServiceReturnType, SelectType } from "App/Types/types"

export default class GetAllTablesForSelectService {

  public static async run(): Promise<ServiceReturnType> {

    const Tables: Table[] = await Table.query()

    const selectTables: SelectType[] = Tables.map((Table: Table) => {
      return {
        key: Table.id,
        value: Table.number
      }
    })

    return {
      message: 'Sucesso',
      success: true,
      object: selectTables
    }

  }
}
