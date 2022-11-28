import Role from "App/Models/Role"
import { ServiceReturnType } from "App/Types/types"

export default class GetAllRolesService {
  public static async run(): Promise<ServiceReturnType> {

    const roles: Role[] = await Role.query().preload('users')

    return {
      message: 'Sucesso',
      success: true,
      object: roles
    }

  }
}
