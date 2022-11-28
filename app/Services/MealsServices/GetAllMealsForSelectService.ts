import Meal from "App/Models/Meal"
import { ServiceReturnType, SelectType } from "App/Types/types"

export default class GetAllMealsForSelectService {

  public static async run(): Promise<ServiceReturnType> {

    const meals: Meal[] = await Meal.query()

    const selectMeals: SelectType[] = meals.map((meal: Meal) => {
      return {
        key: meal.id,
        value: meal.name
      }
    })

    return {
      message: 'Sucesso',
      success: true,
      object: selectMeals
    }

  }
}
