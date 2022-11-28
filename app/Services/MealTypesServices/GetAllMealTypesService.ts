import MealType from "App/Models/MealType"
import { ServiceReturnType } from "App/Types/types"

export default class GetAllMealTypesService {
  public static async run(): Promise<ServiceReturnType> {

    const mealTypes: MealType[] = await MealType.query().preload('meals')

    return {
      message: 'Sucesso',
      success: true,
      object: mealTypes
    }

  }
}
