import Meal from "App/Models/Meal"
import { ServiceReturnType } from "App/Types/types"

export default class GetMealByIdService {

  public static async run(id: number): Promise<ServiceReturnType> {

    const meal: Meal | null = await Meal.query().where('id', id).first()

    return {
      message: !meal ? "Refeição não encontrada" : 'Sucesso',
      success: !meal ? false : true,
      object: meal
    }

  }
}
