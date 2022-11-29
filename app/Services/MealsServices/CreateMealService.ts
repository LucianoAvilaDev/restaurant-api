import Meal from "App/Models/Meal"
import { ServiceReturnType } from "App/Types/types"
import MealsValidator from "App/Validators/MealsValidator"

export default class CreateMealService {
  public static async run(request: any): Promise<ServiceReturnType> {

    try {

      const mealsSchema = MealsValidator.mealsSchema
      const mealsMessages = MealsValidator.mealsMessages

      const payload = await request.validate({ schema: mealsSchema, messages: mealsMessages })

      const meal: Meal = await Meal.create(payload)

      return {
        message: "Refeição cadastrada com Sucesso",
        success: true,
        object: meal
      }

    }

    catch (e: any) {
      return {
        message: e.message,
        success: false,
        object: null
      }
    }

  }
}
