import Meal from "App/Models/Meal"
import { ServiceReturnType } from "App/Types/types"

export default class GetAllMealsService {
  public static async run(): Promise<ServiceReturnType> {

    const meals: Meal[] = await Meal.query().preload('orderItems').preload('mealType')

    return {
      message: 'Sucesso',
      success: true,
      object: meals
    }

  }
}
