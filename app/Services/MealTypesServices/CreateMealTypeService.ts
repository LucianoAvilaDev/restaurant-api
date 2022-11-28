import MealType from "App/Models/MealType"
import { ServiceReturnType } from "App/Types/types"
import MealTypesValidator from "App/Validators/MealTypesValidator"

export default class CreateMealTypeService {
  public static async run(request: any): Promise<ServiceReturnType> {

    try {

      const MealTypesSchema = MealTypesValidator.mealTypesSchema
      const MealTypesMessages = MealTypesValidator.mealTypesMessages

      const payload = await request.validate(MealTypesSchema, MealTypesMessages)

      const mealType: MealType = await MealType.create(payload)

      return {
        message: "Refeição cadastrada com Sucesso",
        success: true,
        object: mealType
      }

    }

    catch (e: any) {
      throw new Error(e.message)
    }

  }
}
