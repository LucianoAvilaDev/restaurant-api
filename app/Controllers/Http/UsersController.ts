import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UsersService from 'App/Services/UsersService'

export default class UsersController {

  public async index({ response }: HttpContextContract) {

    try {

      const user: User[] = await User.query().preload('role')

      return response.ok(user)

    }

    catch (error: any) {
      return error
    }

  }

  public async create({ }: HttpContextContract) { }


  public async store({ request, response }: HttpContextContract) {

    try {
      const data: unknown = {
        name: request.input('name'),
        email: request.input('email'),
        password: request.input('password'),
        roleId: request.input('roleId')
      }

      const user: User = await User.create(data as User)

      return response.created(user)
    }
    catch (error: any) {
      return error
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const user: User | null = await UsersService.GetUserById(params.id)

      return response.ok(user)

    }

    catch (error: any) {
      return error
    }

  }

  public async edit({ params, response }: HttpContextContract) {

    try {

      const user: User | null = await UsersService.GetUserById(params.id)

      return response.ok(user)

    }

    catch (error: any) {
      return error
    }

  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const id: Number = params.id

      const user: any = await User.find(id)
      if (!user) {
        return response.notFound({ message: 'usere não encontrado' })
      }

      const updateUser: User = UsersService.UpdateUserFields(id, request)

      await updateUser.save()

      return response.ok(updateUser)
    }
    catch (error: any) {
      return error
    }
  }

  public async destroy({ }: HttpContextContract) { }
}
