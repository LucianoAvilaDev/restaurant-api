import User from "App/Models/User"
import { ServiceReturnType } from "App/Types/types"

export const GetUserByIdService = async (id: number): Promise<ServiceReturnType> => {

  const user: User | null = await User.query().where('id', id).first()

  return {
    message: !user ? "Usuário não encontrado" : 'Sucesso',
    success: !user ? false : true,
    object: user
  }

}
