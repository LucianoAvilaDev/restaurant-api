import Role from "App/Models/Role"
import { ServiceReturnType } from "App/Types/types"
import RolesValidator from "App/Validators/RolesValidator"

export default class CreateRoleService {
  public static async run(request: any): Promise<ServiceReturnType> {

    try {

      const rolesSchema = RolesValidator.rolesSchema
      const rolesMessages = RolesValidator.rolesMessages

      const payload = await request.validate({ schema: rolesSchema, messages: rolesMessages })

      const role: Role = await Role.create(payload)

      return {
        message: "Perfil cadastrado com Sucesso",
        success: true,
        object: role
      }

    }

    catch (e: any) {
      return {
        message: e.message,
        success: false,
        object: null
      }
    }

  }
}
