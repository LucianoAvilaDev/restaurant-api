<<<<<<< HEAD
import { AuthContract } from "@ioc:Adonis/Addons/Auth"
import User from "App/Models/User"
=======
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import User from 'App/Models/User'
>>>>>>> 171371d2b854419c14b1b97483bbf4f77c6029ca

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
