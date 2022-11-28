import MealType from "App/Models/MealType"
import { ServiceReturnType } from "App/Types/types"
import GetMealTypeWithRelationsByIdService from "./GetMealTypeWithRelationsByIdService"

export default class DeleteMealTypeByIdService {

  public static async run(id: Number): Promise<ServiceReturnType> {

    const returnObject: ServiceReturnType = await GetMealTypeWithRelationsByIdService.run(id as number)

    if (!returnObject.object)
      throw new Error(returnObject.message)

    const mealType = returnObject.object as MealType

    if (mealType.$hasRelated('orders'))
      throw new Error(returnObject.message)

    await mealType.delete()

    return {
      object: mealType,
      message: "Refeição excluída com sucesso!",
      success: true
    }

  }
}
