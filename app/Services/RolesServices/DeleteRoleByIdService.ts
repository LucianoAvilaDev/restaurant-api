import Role from "App/Models/Role"
import { ServiceReturnType } from "App/Types/types"
import GetRoleWithRelationsByIdService from "./GetRoleWithRelationsByIdService"

export default class DeleteRoleByIdService {

  public static async run(id: Number): Promise<ServiceReturnType> {

    const returnObject: ServiceReturnType = await GetRoleWithRelationsByIdService.run(id as number)

    if (!returnObject.object)
      throw new Error(returnObject.message)

    const Role = returnObject.object as Role

    if (Role.$hasRelated('users'))
      throw new Error("Existem Usuários cadastrados com este Perfil.")

    await Role.delete()

    return {
      object: Role,
      message: "Perfil cadastrado com sucesso!",
      success: true
    }

  }
}
