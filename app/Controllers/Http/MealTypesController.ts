import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import MealType from 'App/Models/MealType'
import MealTypesValidator from 'App/Validators/MealTypesValidator'

export default class MealTypeTypesController {

  private mealTypesSchema: any = MealTypesValidator.mealTypesSchema
  private mealTypesMessages: CustomMessages = MealTypesValidator.mealTypesMessages

  public async index({ response }: HttpContextContract) {

    try {

      const mealTypes: MealType[] = await MealType.all()

      return response.ok(mealTypes)

    }

    catch (e: any) {

      throw new Error(e)

    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      const payload = await request.validate({ schema: this.mealTypesSchema, messages: this.mealTypesMessages })

      const mealType: MealType = await MealType.create(payload)

      return response.ok(mealType)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const mealType: MealType = await MealType.findOrFail(params.id)

      return response.ok(mealType)

    }
    catch (e: any) {
      throw new Error(e)
    }

  }

  public async update({ request, params, response }) {

    try {

      const payload: any = await request.validate({ schema: this.mealTypesSchema, messages: this.mealTypesMessages })

      const existingMealType: MealType = await MealType.findOrFail(params.id)

      existingMealType.name = payload.name

      const updatedMealType: MealType = await existingMealType.save()

      return response.ok(updatedMealType)

    }

    catch (e: any) {

      throw new Error(e)

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const mealType: MealType = await MealType.query().preload('meals').where(params.id).firstOrFail()


      if (mealType.$hasRelated('meals'))
        return response.badRequest("Esse Tipo de Refeição está sendo usada por uma ou mais Refeições")

      await mealType.delete()

      return response.ok(mealType)

    }

    catch (e: any) {

      throw new Error(e)

    }
  }

}
