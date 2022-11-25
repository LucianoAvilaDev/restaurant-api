import User from "App/Models/User"
import { ServiceReturnType } from "App/Types/types"
import { GetUserByIdService } from "./GetUserByIdService"

export const DeleteUserByIdService = async (id: Number): Promise<ServiceReturnType> => {

  const returnObject: ServiceReturnType = await GetUserByIdService(id as number)

  if (!returnObject.object)
    throw new Error(returnObject.message)

  const user = returnObject.object as User

  if (user.$hasRelated('orders'))
    throw new Error(returnObject.message)

  await user.delete()

  return {
    object: user,
    message: "Usuário excluído com sucesso!",
    success: true
  }

}
