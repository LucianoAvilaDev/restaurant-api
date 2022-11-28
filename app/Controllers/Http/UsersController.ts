import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserService from 'App/Services/UsersServices/CreateUserService'
import DeleteUserByIdService from 'App/Services/UsersServices/DeleteUserByIdService'
import GetAllUsersService from 'App/Services/UsersServices/GetAllUsersService'
import GetUserByIdService from 'App/Services/UsersServices/GetUserByIdService'
import UpdateUserByIdService from 'App/Services/UsersServices/UpdateUserByIdService'
import { ServiceReturnType } from 'App/Types/types'
export default class UsersController {

  public async index({ response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await GetAllUsersService.run()

      if (!returnObject.success)
        throw new Error(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (error: any) {
      return error
    }

  }

  public async create({ }: HttpContextContract) { }


  public async store({ request, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await CreateUserService.run(request)

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

      const returnObject: ServiceReturnType = await GetUserByIdService.run(params.id)

      if (!returnObject.success)
        throw new Error(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (error: any) {
      return error
    }

  }

  public async edit({ params, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await GetUserByIdService.run(params.id)

      if (!returnObject.success)
        throw new Error(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (error: any) {
      return error
    }

  }

  public async update({ request, params, response }: HttpContextContract) {
    try {

      const returnObject: ServiceReturnType = await UpdateUserByIdService.run(params.id, request)

      if (!returnObject.success)
        throw new Error(returnObject.message)

      return response.ok(returnObject.object)
    }
    catch (error: any) {
      return error
    }
  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await DeleteUserByIdService.run(params.id)

      if (!returnObject.success)
        throw new Error(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (err: unknown) {
      return err
    }

  }

}

