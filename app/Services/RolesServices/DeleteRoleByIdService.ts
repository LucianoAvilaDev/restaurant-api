import Role from "App/Models/Role"
import { ServiceReturnType } from "App/Types/types"
import GetRoleWithRelationsByIdService from "./GetRoleWithRelationsByIdService"

export default class DeleteRoleByIdService {

  public static async run(id: Number): Promise<ServiceReturnType> {

    const returnObject: ServiceReturnType = await GetRoleWithRelationsByIdService.run(id as number)

    if (!returnObject.object)
      return {
        message: returnObject.message,
        success: false,
        object: null
      }

    const role = returnObject.object as Role

    if (role.$hasRelated('users'))
      return {
        message: "Esse Perfil está sendo usado por um ou mais Usuários.",
        success: false,
        object: null
      }

    await role.delete()

    return {
      object: Role,
      message: "Perfil cadastrado com sucesso!",
      success: true
    }

  }
}
