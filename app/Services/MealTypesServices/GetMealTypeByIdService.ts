import MealType from "App/Models/MealType"
import { ServiceReturnType } from "App/Types/types"

export default class GetMealTypeByIdService {

  public static async run(id: number): Promise<ServiceReturnType> {

    const mealType: MealType | null = await MealType.query().where('id', id).first()

    return {
      message: !mealType ? "Refeição não encontrada" : 'Sucesso',
      success: !mealType ? false : true,
      object: mealType
    }

  }
}
