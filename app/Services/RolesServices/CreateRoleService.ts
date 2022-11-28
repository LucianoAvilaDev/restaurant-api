import Role from "App/Models/Role"
import { ServiceReturnType } from "App/Types/types"
import RolesValidator from "App/Validators/RolesValidator"

export default class CreateRoleService {
  public static async run(request: any): Promise<ServiceReturnType> {

    try {

      const rolesSchema = RolesValidator.rolesSchema
      const rolesMessages = RolesValidator.rolesMessages

      const payload = await request.validate(rolesSchema, rolesMessages)

      const role: Role = await Role.create(payload)

      return {
        message: "Perfil cadastrado com Sucesso",
        success: true,
        object: role
      }

    }

    catch (e: any) {
      throw new Error(e.message)
    }

  }
}
