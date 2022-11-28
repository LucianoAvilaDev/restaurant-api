import { AuthContract } from "@ioc:Adonis/Addons/Auth"
import User from "App/Models/User"
import { ServiceReturnType } from "App/Types/types"

export default class GetCurrentUserFullDataService {

  public static async run(auth: AuthContract): Promise<ServiceReturnType> {

    const userId: number | undefined = auth.use('api').user?.id

    if (!userId)
      return {
        message: 'Não autenticado!',
        success: false,
      }

    const user: User | null = await User.query().preload('role', (roleQuery) => {
      roleQuery.preload('permissions')
    }).where('id', userId).first()

    return {
      message: user ? 'Sucesso' : 'Usuário não encontrado',
      success: user ? true : false,
      object: user
    }

  }
}
