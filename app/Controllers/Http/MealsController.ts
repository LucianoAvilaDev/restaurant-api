import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages } from '@ioc:Adonis/Core/Validator'
import Meal from 'App/Models/Meal'
import MealsValidator from 'App/Validators/MealsValidator'

export default class MealsController {

  private mealsValidator: any
  private mealsSchema: any
  private mealsMessages: CustomMessages

  public async index({ response }: HttpContextContract) {

    try {

      const meals: Meal[] = await Meal.query().preload('mealType')

      return response.ok(meals)

    }

    catch (e: any) {

      throw e

    }

  }

  public async store({ request, response }: HttpContextContract) {

    try {

      this.mealsValidator = new MealsValidator()

      this.mealsSchema = this.mealsValidator.mealsSchema
      this.mealsMessages = this.mealsValidator.mealsMessages

      const payload: Meal = await request.validate({ schema: this.mealsSchema, messages: this.mealsMessages })

      const meal: Meal = await Meal.create(payload)

      return response.ok(meal)

    }
    catch (e: any) {
      throw e
    }

  }

  public async show({ params, response }: HttpContextContract) {

    try {

      const meal: Meal = await Meal.query().preload('mealType').where('id', params.id).firstOrFail()

      return response.ok(meal)

    }
    catch (e: any) {
      throw e
    }

  }

  public async update({ request, params, response }) {

    try {

      this.mealsValidator = new MealsValidator()

      this.mealsSchema = this.mealsValidator.mealsSchema
      this.mealsMessages = this.mealsValidator.mealsMessages

      const payload: any = await request.validate({ schema: this.mealsSchema, messages: this.mealsMessages })

      const existingMeal: Meal = await Meal.findOrFail(params.id)

      existingMeal.name = payload.name
      existingMeal.description = payload.description
      existingMeal.price = payload.price
      existingMeal.mealTypeId = payload.mealTypeId

      const updatedMeal: Meal = await existingMeal.save()

      return response.ok(updatedMeal)

    }

    catch (e: any) {

      throw e

    }

  }

  public async destroy({ params, response }: HttpContextContract) {

    try {

      const meal: Meal = await Meal.query().preload('orderItems').where('id', params.id).firstOrFail()

      if (meal.orderItems.length > 0)
        return response.badRequest("Essa Refeição está em um ou mais Pedidos")

      await meal.delete()

      return response.ok(meal)

    }

    catch (e: any) {

      throw e

    }
  }
}
