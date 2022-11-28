import Role from "App/Models/Role"
import { ServiceReturnType } from "App/Types/types"
import RoleValidator from "App/Validators/RolesValidator"
import GetRoleByIdService from "./GetRoleByIdService"

export default class UpdateRoleByIdService {

  public static async run(id: Number, request: any): Promise<ServiceReturnType> {

    const rolesSchema = RoleValidator.rolesSchema
    const rolesMessages = RoleValidator.rolesMessages

    const payload: any = await request.validate(rolesSchema, rolesMessages)

    const returnObject: ServiceReturnType = await GetRoleByIdService.run(id as number)

    if (!returnObject.success)
      return {
        success: true,
        message: returnObject.message,
        object: null
      }

    const existingRole: Role = returnObject.object as Role

    existingRole.name = payload.name

    existingRole.save()

    return {
      success: true,
      object: existingRole,
      message: "Perfil atualizado com sucesso"
    }

  }
}
