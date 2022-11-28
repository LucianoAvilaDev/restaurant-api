import { AuthContract } from "@ioc:Adonis/Addons/Auth"
import { ServiceReturnType } from "App/Types/types"
import User from "App/Models/User"
import Permission from "App/Models/Permission"
import GetCurrentUserFullDataService from "./GetCurrentUserFullDataService"

export default class GetCurrentUserPermissionsService {

  public static async run(auth: AuthContract): Promise<string[]> {

    const returnData: ServiceReturnType = await GetCurrentUserFullDataService.run(auth)

    if (!returnData.object)
      throw new Error('Houve um erro')

    const user: User = returnData.object as User

    const permissions: string[] = user.role.permissions.map((permission: Permission) => {
      return permission.name
    })

    return permissions

  }
}

