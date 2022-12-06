import { AuthContract } from "@ioc:Adonis/Addons/Auth"
import User from "App/Models/User"
import { ServiceReturnType } from "App/Types/types"

export default class GetCurrentUserFullDataService {

  public static async run(auth: AuthContract): Promise<User> {

    const userId: number | undefined = auth.use('api').user?.id

    if (!userId)
      throw Error("Usuário não conectado")

    const user: User = await User.query().preload('role', (roleQuery) => {
      roleQuery.preload('permissions')
    }).where('id', userId).firstOrFail()

    return user

  }
}
