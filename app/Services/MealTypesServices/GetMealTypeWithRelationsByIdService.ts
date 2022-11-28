import MealType from "App/Models/MealType"
import { ServiceReturnType } from "App/Types/types"

export default class GetMealTypeWithRelationsByIdService {

  public static async run(id: number): Promise<ServiceReturnType> {

    const mealType: MealType | null = await MealType.query().preload('meals').where('id', id).first()

    return {
      message: !mealType ? "Refeição não encontrada" : 'Sucesso',
      success: !mealType ? false : true,
      object: mealType
    }

  }
}
