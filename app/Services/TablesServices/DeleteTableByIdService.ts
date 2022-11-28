import Table from "App/Models/Table"
import { ServiceReturnType } from "App/Types/types"
import GetTableWithRelationsByIdService from "./GetTableWithRelationsByIdService"

export default class DeleteTableByIdService {

  public static async run(id: Number): Promise<ServiceReturnType> {

    const returnObject: ServiceReturnType = await GetTableWithRelationsByIdService.run(id as number)

    if (!returnObject.object)
      throw new Error(returnObject.message)

    const Table = returnObject.object as Table

    if (Table.$hasRelated('users'))
      throw new Error("Existem Usuários cadastrados com este Perfil.")

    await Table.delete()

    return {
      object: Table,
      message: "Perfil cadastrado com sucesso!",
      success: true
    }

  }
}
