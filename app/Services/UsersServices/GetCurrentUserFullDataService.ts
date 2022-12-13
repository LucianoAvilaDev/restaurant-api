import { AuthContract } from "@ioc:Adonis/Addons/Auth"
import User from "App/Models/User"

export default class GetCurrentUserFullDataService {
  public static async run(auth: AuthContract): Promise<User> {
    const userId: number | undefined = auth.use('api').user?.id

    if (!userId) throw Error('Usuário não conectado')

    return User.query()
      .preload('role', (roleQuery) => {
        roleQuery.preload('permissions', (query) => {
          query.select('name')
        })
      })
      .where('id', userId)
      .firstOrFail()
  }
}
