import Permission from "App/Models/Permission"
import { ServiceReturnType, SelectType } from "App/Types/types"

export default class GetAllPermissionsForSelectService {

  public static async run(): Promise<ServiceReturnType> {

    const permissions: Permission[] = await Permission.query()

    const selectPermissions: SelectType[] = permissions.map((permission: Permission) => {
      return {
        key: permission.id,
        value: permission.description
      }
    })

    return {
      message: 'Sucesso',
      success: true,
      object: selectPermissions
    }

  }
}
