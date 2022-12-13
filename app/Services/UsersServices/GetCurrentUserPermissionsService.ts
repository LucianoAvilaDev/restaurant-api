import { AuthContract } from "@ioc:Adonis/Addons/Auth"
import User from "App/Models/User"
import Permission from "App/Models/Permission"
import GetCurrentUserFullDataService from "./GetCurrentUserFullDataService"

export default class GetCurrentUserPermissionsService {

  public static async run(auth: AuthContract): Promise<string[]> {

    const user: User = await GetCurrentUserFullDataService.run(auth)

    if (!user)
      throw new Error('Houve um erro')


    const permissions: string[] = user.role.permissions.map((permission: Permission) => {
      return permission.name
    })

    return permissions

  }
}

