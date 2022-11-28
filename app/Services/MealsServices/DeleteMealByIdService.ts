import Meal from "App/Models/Meal"
import { ServiceReturnType } from "App/Types/types"
import GetMealWithRelationsByIdService from "./GetMealWithRelationsByIdService"

export default class DeleteMealByIdService {

  public static async run(id: Number): Promise<ServiceReturnType> {

    const returnObject: ServiceReturnType = await GetMealWithRelationsByIdService.run(id as number)

    if (!returnObject.object)
      throw new Error(returnObject.message)

    const meal = returnObject.object as Meal

    if (meal.$hasRelated('orders'))
      throw new Error(returnObject.message)

    await meal.delete()

    return {
      object: meal,
      message: "Refeição excluída com sucesso!",
      success: true
    }

  }
}
