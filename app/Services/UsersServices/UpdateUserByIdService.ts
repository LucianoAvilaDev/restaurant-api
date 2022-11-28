import User from "App/Models/User"
import { ServiceReturnType } from "App/Types/types"
import { usersSchema, usersMessages } from "App/Validators/UserValidator"
import GetUserByIdService, { } from "./GetUserByIdService"

export default class UpdateUserByIdService {

  public static async run(id: Number, request: any): Promise<ServiceReturnType> {

    const payload: any = await request.validate(usersSchema, usersMessages)

    const returnObject: ServiceReturnType = await GetUserByIdService.run(id as number)

    if (!returnObject.success)
      throw new Error(returnObject.message)

    const existingUser: User = returnObject.object as User

    existingUser.name = payload.name
    existingUser.email = payload.email
    existingUser.password = payload.password
    existingUser.roleId = payload.roleId

    existingUser.save()

    return { ...returnObject, object: existingUser }

  }
}
