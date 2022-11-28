import Meal from "App/Models/Meal"
import { ServiceReturnType } from "App/Types/types"
import MealValidator from "App/Validators/MealsValidator"
import GetMealByIdService from "./GetMealByIdService"

export default class UpdateMealByIdService {

  public static async run(id: Number, request: any): Promise<ServiceReturnType> {

    const mealsSchema = MealValidator.mealsSchema
    const mealsMessages = MealValidator.mealsMessages

    const payload: any = await request.validate(mealsSchema, mealsMessages)

    const returnObject: ServiceReturnType = await GetMealByIdService.run(id as number)

    if (!returnObject.success)
      return {
        message: returnObject.message,
        success: false,
        object: null
      }

    const existingMeal: Meal = returnObject.object as Meal

    existingMeal.name = payload.name
    existingMeal.description = payload.description
    existingMeal.price = payload.price
    existingMeal.mealTypeId = payload.mealTypeId

    existingMeal.save()

    return {
      success: true,
      message: "Refeição atualizada com sucesso.",
      object: existingMeal
    }

  }
}
