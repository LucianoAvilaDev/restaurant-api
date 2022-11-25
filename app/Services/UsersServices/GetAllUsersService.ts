import User from "App/Models/User"
import { ServiceReturnType } from "App/Types/types"

export const GetAllUsersService = async (): Promise<ServiceReturnType> => {

  const users: User[] = await User.query().preload('role')

  return {
    message: 'Sucesso',
    success: true,
    object: users
  }

}
