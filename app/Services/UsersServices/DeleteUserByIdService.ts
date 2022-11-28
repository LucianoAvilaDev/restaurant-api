import User from "App/Models/User"
import { ServiceReturnType } from "App/Types/types"
import GetUserByIdService from "./GetUserByIdService"

export default class DeleteUserByIdService {

  public static async run(id: Number): Promise<ServiceReturnType> {

    const returnObject: ServiceReturnType = await GetUserByIdService.run(id as number)

    if (!returnObject.object)
      return {
        success: true,
        message: returnObject.message,
        object: null
      }


    const user = returnObject.object as User

    if (user.$hasRelated('orders'))
      return {
        success: true,
        message: "Esse Usuário esta sendo usado por um ou mais Pedidos.",
        object: null
      }


    await user.delete()

    return {
      object: user,
      message: "Usuário excluído com sucesso!",
      success: true
    }

  }
}
