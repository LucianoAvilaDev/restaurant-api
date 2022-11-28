import MealType from "App/Models/MealType"
import { ServiceReturnType } from "App/Types/types"
import GetMealTypeWithRelationsByIdService from "./GetMealTypeWithRelationsByIdService"

export default class DeleteMealTypeByIdService {

  public static async run(id: Number): Promise<ServiceReturnType> {

    const returnObject: ServiceReturnType = await GetMealTypeWithRelationsByIdService.run(id as number)

    if (!returnObject.object)
      return {
        message: returnObject.message,
        success: false,
        object: null
      }

    const mealType = returnObject.object as MealType

    if (mealType.$hasRelated('meals'))
      return {
        message: "Esse Tipo de Refeição está sendo usado por uma ou mais Refeições.",
        success: false,
        object: null
      }

    await mealType.delete()

    return {
      object: mealType,
      message: "Tipo de Refeição excluída com sucesso!",
      success: true
    }

  }
}
