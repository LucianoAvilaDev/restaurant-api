import MealType from "App/Models/MealType"
import { ServiceReturnType } from "App/Types/types"
import MealTypesValidator from "App/Validators/MealTypesValidator"

export default class CreateMealTypeService {
  public static async run(request: any): Promise<ServiceReturnType> {

    try {

      const mealTypesSchema = MealTypesValidator.mealTypesSchema
      const mealTypesMessages = MealTypesValidator.mealTypesMessages

      const payload = await request.validate({ schema: mealTypesSchema, messages: mealTypesMessages })

      const mealType: MealType = await MealType.create(payload)

      return {
        message: "Tipo de Refeição cadastrado com Sucesso",
        success: true,
        object: mealType
      }

    }

    catch (e: any) {
      return {
        message: e.message,
        success: false,
        object: null
      }
    }

  }
}
