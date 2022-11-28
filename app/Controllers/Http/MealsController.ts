import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateMealService from 'App/Services/MealsServices/CreateMealService'
import DeleteMealByIdService from 'App/Services/MealsServices/DeleteMealByIdService'
import GetAllMealsService from 'App/Services/MealsServices/GetAllMealsService'
import GetMealByIdService from 'App/Services/MealsServices/GetMealByIdService'
import UpdateMealByIdService from 'App/Services/MealsServices/UpdateMealByIdService'
import { ServiceReturnType } from 'App/Types/types'

export default class MealsController {
  public async index({ response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await GetAllMealsService.run()

      if (!returnObject.success)
        return response.internalServerError(`Houve um erro: ${returnObject.message}`)

      return response.ok(returnObject.object)

    }
    catch (e: any) {
      return response.internalServerError(`Houve um erro: ${e.message}`)
    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await CreateMealService.run(request)

      if (!returnObject.success)
        return response.internalServerError(`Houve um erro: ${returnObject.message}`)

      return response.ok(returnObject.object)

    }
    catch (e: any) {
      return response.internalServerError(`Houve um erro: ${e.message}`)
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await GetMealByIdService.run(params.id)

      if (!returnObject.success)
        return response.internalServerError(`Houve um erro: ${returnObject.message}`)

      return response.ok(returnObject.object)

    }
    catch (e: any) {
      return response.internalServerError(`Houve um erro: ${e.message}`)
    }

  }

  public async update({ request, params, response }) {

    try {

      const returnObject: ServiceReturnType = await UpdateMealByIdService.run(params.id, request)

      if (!returnObject.success)
        return response.internalServerError(`Houve um erro: ${returnObject.message}`)

      return response.ok(returnObject.object)

    }

    catch (e: any) {

      return response.internalServerError(`Houve um erro: ${e.message}`)

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await DeleteMealByIdService.run(params.id)

      if (!returnObject.success)
        return response.internalServerError(`Houve um erro: ${returnObject.message}`)

      return response.ok(returnObject.object)

    }

    catch (err: unknown) {

      return err

    }
  }
}
