import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import MealType from 'App/Models/MealType'
import MealTypesValidator from 'App/Validators/MealTypesValidator'

export default class MealTypeTypesController {

  private mealTypesValidator: any
  private mealTypesSchema: any
  private mealTypesMessages: CustomMessages

  public async index({ response }: HttpContextContract) {

    try {

      const mealTypes: MealType[] = await MealType.all()

      return response.ok(mealTypes)

    }

    catch (e: any) {

      throw e

    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      this.mealTypesValidator = new MealTypesValidator()

      this.mealTypesSchema = this.mealTypesValidator.mealTypesSchema
      this.mealTypesMessages = this.mealTypesValidator.mealTypesMessages

      const payload: MealType = await request.validate({ schema: this.mealTypesSchema, messages: this.mealTypesMessages })

      const mealType: MealType = await MealType.create(payload)

      return response.ok(mealType)

    }
    catch (e: any) {
      throw e
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const mealType: MealType = await MealType.findOrFail(params.id)

      return response.ok(mealType)

    }
    catch (e: any) {

      throw e

    }

  }

  public async update({ request, params, response }) {

    try {

      this.mealTypesValidator = new MealTypesValidator()

      this.mealTypesSchema = this.mealTypesValidator.mealTypesSchema
      this.mealTypesMessages = this.mealTypesValidator.mealTypesMessages

      const payload: any = await request.validate({ schema: this.mealTypesSchema, messages: this.mealTypesMessages })

      const existingMealType: MealType = await MealType.findOrFail(params.id)

      existingMealType.name = payload.name

      const updatedMealType: MealType = await existingMealType.save()

      return response.ok(updatedMealType)

    }

    catch (e: any) {

      throw e

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const mealType: MealType = await MealType.query().preload('meals').where('id', params.id).firstOrFail()


      if (mealType.meals.length > 0)
        return response.badRequest("Esse Tipo de Refeição está em uma ou mais Refeições")

      await mealType.delete()

      return response.ok(mealType)

    }

    catch (e: any) {

      throw e

    }
  }

}
