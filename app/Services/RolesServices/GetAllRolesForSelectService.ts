import Role from "App/Models/Role"
import { ServiceReturnType, SelectType } from "App/Types/types"

export default class GetAllRolesForSelectService {

  public static async run(): Promise<ServiceReturnType> {

    const roles: Role[] = await Role.query()

    const selectRoles: SelectType[] = roles.map((role: Role) => {
      return {
        key: role.id,
        value: role.name
      }
    })

    return {
      message: 'Sucesso',
      success: true,
      object: selectRoles
    }

  }
}
