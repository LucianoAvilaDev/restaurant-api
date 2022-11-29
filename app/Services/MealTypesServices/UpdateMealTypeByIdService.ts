import MealType from "App/Models/MealType"
import { ServiceReturnType } from "App/Types/types"
import MealTypeValidator from "App/Validators/MealTypesValidator"
import GetMealTypeByIdService from "./GetMealTypeByIdService"

export default class UpdateMealTypeByIdService {

  public static async run(id: Number, request: any): Promise<ServiceReturnType> {

    const mealTypesSchema = MealTypeValidator.mealTypesSchema
    const mealTypesMessages = MealTypeValidator.mealTypesMessages

    const payload: any = await request.validate({ schema: mealTypesSchema, messages: mealTypesMessages })

    const returnObject: ServiceReturnType = await GetMealTypeByIdService.run(id as number)

    if (!returnObject.success)
      return {
        message: returnObject.message,
        success: false,
        object: null
      }

    const existingMealType: MealType = returnObject.object as MealType

    existingMealType.name = payload.name

    existingMealType.save()

    return {
      success: true,
      message: "Tipo de Refeição atualizado com sucesso.",
      object: existingMealType
    }

  }
}
