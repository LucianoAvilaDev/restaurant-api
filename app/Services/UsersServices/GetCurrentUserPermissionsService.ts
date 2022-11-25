import { AuthContract } from "@ioc:Adonis/Addons/Auth"
import { ServiceReturnType } from "App/Types/types"
import User from "App/Models/User"
import { GetCurrentUserFullDataService } from "./GetCurrentUserFullDataService"
import Permission from "App/Models/Permission"

export const GetCurrentUserPermissionsService = async (auth: AuthContract): Promise<string[]> => {

  const returnData: ServiceReturnType = await GetCurrentUserFullDataService(auth)

  if (!returnData.object)
    throw new Error('Houve um erro')

  const user: User = returnData.object as User

  const permissions: string[] = user.role.permissions.map((permission: Permission) => {
    return permission.name
  })

  return permissions

}

