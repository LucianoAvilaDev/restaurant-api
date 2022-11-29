import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateMealTypeService from 'App/Services/MealTypesServices/CreateMealTypeService'
import DeleteMealTypeByIdService from 'App/Services/MealTypesServices/DeleteMealTypeByIdService'
import GetAllMealTypesService from 'App/Services/MealTypesServices/GetAllMealTypesService'
import GetMealTypeByIdService from 'App/Services/MealTypesServices/GetMealTypeByIdService'
import UpdateMealTypeByIdService from 'App/Services/MealTypesServices/UpdateMealTypeByIdService'
import { ServiceReturnType } from 'App/Types/types'

export default class MealTypesController {

  public async index({ response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await GetAllMealTypesService.run()

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (e: any) {
      return response.internalServerError(`Houve um erro: ${e.message}`)
    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await CreateMealTypeService.run(request)

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (e: any) {
      return response.internalServerError(`Houve um erro: ${e.message}`)
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await GetMealTypeByIdService.run(params.id)

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }
    catch (e: any) {
      return response.internalServerError(`Houve um erro: ${e.message}`)
    }

  }

  public async update({ request, params, response }) {

    try {

      const returnObject: ServiceReturnType = await UpdateMealTypeByIdService.run(params.id, request)

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (e: any) {

      return response.internalServerError(`Houve um erro: ${e.message}`)

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const returnObject: ServiceReturnType = await DeleteMealTypeByIdService.run(params.id)

      if (!returnObject.success)
        return response.ok(returnObject.message)

      return response.ok(returnObject.object)

    }

    catch (err: unknown) {

      return err

    }
  }
}
