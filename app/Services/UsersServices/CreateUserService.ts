import User from "App/Models/User"
import { ServiceReturnType } from "App/Types/types"
import UserValidator from "App/Validators/UsersValidator"

export default class CreateUserService {

  public static async run(request: any): Promise<ServiceReturnType> {

    try {

      const usersSchema = UserValidator.usersSchema
      const usersMessages = UserValidator.usersMessages

      const payload = await request.validate({ schema: usersSchema, messages: usersMessages })

      const user: User = await User.create(payload)

      return {
        message: "Usuário cadastrado com Sucesso",
        success: true,
        object: user
      }

    }

    catch (e: any) {
      return {
        success: false,
        message: e,
        object: null
      }

    }

  }
}
