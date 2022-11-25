import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UsersService from 'App/Services/UsersService'
import { ServiceReturnType } from 'App/Types/types'
export default class UsersController {

  public async index({ response }: HttpContextContract) {

    try {

      const user: User[] = await User.query().preload('role', (roleQuery) => {
        return roleQuery.preload('permissions')
      })

      return response.ok(user)

    }

    catch (error: any) {
      return error
    }

  }

  public async create({ }: HttpContextContract) { }


  public async store({ request, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await UsersService.CreateUser(request)

      if (!returnObject.success)
        throw new Error(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (error: any) {
      return error
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await UsersService.GetUserById(params.id)

      if (!returnObject.success)
        return response.internalServerError(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (error: any) {
      return error
    }

  }

  public async edit({ params, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await UsersService.GetUserById(params.id)

      if (!returnObject.success)
        return response.internalServerError(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (error: any) {
      return error
    }

  }

  public async update({ request, params, response }: HttpContextContract) {
    try {

      const returnObject: ServiceReturnType = await UsersService.UpdateUser(params.id, request)

      if (!returnObject.success)
        return response.internalServerError(returnObject.message)

      return response.ok(returnObject.object)
    }
    catch (error: any) {
      return error
    }
  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const { id } = params

      const user: any = await User.find(id)
      if (!user) {
        return response.notFound({ message: 'Usuário não encontrado' })
      }

      await user.delete()

      return response.ok({ message: 'Usuário excluído com sucesso.' })

    }
    catch (err: unknown) {
      return err
    }

  }
}
