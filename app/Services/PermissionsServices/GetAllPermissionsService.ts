import Permission from "App/Models/Permission"
import { ServiceReturnType } from "App/Types/types"

export default class GetAllPermissionsForSelectService {

  public static async run(): Promise<ServiceReturnType> {

    try {

      const permissions: Permission[] = await Permission.query()

      return {
        message: 'Sucesso',
        success: true,
        object: permissions
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
