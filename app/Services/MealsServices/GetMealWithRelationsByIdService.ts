import Meal from "App/Models/Meal"
import { ServiceReturnType } from "App/Types/types"

export default class GetMealWithRelationsByIdService {

  public static async run(id: number): Promise<ServiceReturnType> {

    const meal: Meal | null = await Meal.query().preload('orderItems').preload('mealType').where('id', id).first()

    return {
      message: !meal ? "Refeição não encontrada" : 'Sucesso',
      success: !meal ? false : true,
      object: meal
    }

  }
}
