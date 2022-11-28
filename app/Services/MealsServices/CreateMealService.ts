import Meal from "App/Models/Meal"
import { ServiceReturnType } from "App/Types/types"
import MealsValidator from "App/Validators/MealsValidator"

export default class CreateMealService {
  public static async run(request: any): Promise<ServiceReturnType> {

    try {

      const MealsSchema = MealsValidator.mealsSchema
      const MealsMessages = MealsValidator.mealsMessages

      const payload = await request.validate(MealsSchema, MealsMessages)

      const meal: Meal = await Meal.create(payload)

      return {
        message: "Refeição cadastrada com Sucesso",
        success: true,
        object: meal
      }

    }

    catch (e: any) {
      throw new Error(e.message)
    }

  }
}
