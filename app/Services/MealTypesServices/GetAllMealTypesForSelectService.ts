import MealType from "App/Models/MealType"
import { ServiceReturnType, SelectType } from "App/Types/types"

export default class GetAllMealTypesForSelectService {

  public static async run(): Promise<ServiceReturnType> {

    const mealTypes: MealType[] = await MealType.query()

    const selectMealTypes: SelectType[] = mealTypes.map((mealType: MealType) => {
      return {
        key: mealType.id,
        value: mealType.name
      }
    })

    return {
      message: 'Sucesso',
      success: true,
      object: selectMealTypes
    }

  }
}
