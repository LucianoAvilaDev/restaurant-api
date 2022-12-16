import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersFiltersController {
  public async handle({ response, request }: HttpContextContract) {

    const { name, email } = request.body()

    const Users: User[] = await User.query().preload('role')
      .if(name, (UserQuery) => {
        UserQuery.where('name', "like", `%${name}%`)
      })
      .if(email, (UserQuery) => {
        UserQuery.where('email', "like", `%${email}%`)
      })


    return response.ok(Users)
  }
}
