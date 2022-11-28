import Table from "App/Models/Table"
import { ServiceReturnType } from "App/Types/types"

export default class GetTableWithRelationsByIdService {

  public static async run(id: number): Promise<ServiceReturnType> {

    const table: Table | null = await Table.query().preload('orders').where('id', id).first()

    return {
      message: !table ? "Mesa não encontrada" : 'Sucesso',
      success: !table ? false : true,
      object: table
    }

  }
}
