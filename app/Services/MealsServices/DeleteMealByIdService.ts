import Meal from "App/Models/Meal"
import { ServiceReturnType } from "App/Types/types"
import GetMealWithRelationsByIdService from "./GetMealWithRelationsByIdService"

export default class DeleteMealByIdService {

  public static async run(id: Number): Promise<ServiceReturnType> {

    const returnObject: ServiceReturnType = await GetMealWithRelationsByIdService.run(id as number)

    if (!returnObject.object)
      return {
        message: returnObject.message,
        success: false,
        object: null
      }

    const meal = returnObject.object as Meal

    if (meal.$hasRelated('orders'))
      return {
        message: "Essa Refeição está sendo usada por um ou mais Pedidos.",
        success: false,
        object: null
      }

    await meal.delete()

    return {
      object: meal,
      message: "Refeição excluída com sucesso!",
      success: true
    }

  }
}
