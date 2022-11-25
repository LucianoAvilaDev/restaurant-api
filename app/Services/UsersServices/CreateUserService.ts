import User from "App/Models/User"
import { ServiceReturnType } from "App/Types/types"
import { usersMessages, usersSchema } from "App/Validators/UserValidator"

export const CreateUserService = async (request: any): Promise<ServiceReturnType> => {

  try {

    const payload = await request.validate(usersSchema, usersMessages)

    const user: User = await User.create(payload)

    return {
      message: "Usuário cadastrado com Sucesso",
      success: true,
      object: user
    }

  }

  catch (e: any) {
    throw new Error(e.message)
  }

}
