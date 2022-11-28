import Table from "App/Models/Table"
import { ServiceReturnType } from "App/Types/types"

export default class GetTableByIdService {

  public static async run(id: number): Promise<ServiceReturnType> {

    const table: Table | null = await Table.query().where('id', id).first()

    return {
      message: !table ? "Mesa não encontrada" : 'Sucesso',
      success: !table ? false : true,
      object: table
    }

  }
}
