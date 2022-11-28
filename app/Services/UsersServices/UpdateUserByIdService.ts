import User from "App/Models/User"
import { ServiceReturnType } from "App/Types/types"
import UserValidator from "App/Validators/UsersValidator"
import GetUserByIdService from "./GetUserByIdService"

export default class UpdateUserByIdService {

  public static async run(id: Number, request: any): Promise<ServiceReturnType> {

    const usersSchema = UserValidator.usersSchema
    const usersMessages = UserValidator.usersMessages

    const payload: any = await request.validate(usersSchema, usersMessages)

    const returnObject: ServiceReturnType = await GetUserByIdService.run(id as number)

    if (!returnObject.success)
      return {
        success: true,
        message: returnObject.message,
        object: null
      }


    const existingUser: User = returnObject.object as User

    existingUser.name = payload.name
    existingUser.email = payload.email
    existingUser.password = payload.password
    existingUser.roleId = payload.roleId

    existingUser.save()

    return {
      message: "Usuário atulizado com sucesso.",
      success: true,
      object: existingUser
    }

  }
}
