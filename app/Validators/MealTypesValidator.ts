import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class MealTypesValidator {

  public mealTypesSchema: any = schema.create({

    name: schema.string(
      { trim: false }, [
      rules.minLength(6),
      rules.maxLength(100),
      rules.required()
    ]),

  })

  public mealTypesMessages: CustomMessages = {

    'name.minLength': "O Nome deve ter no mínimo {{ options.minLength }} caracteres.",
    'name.maxLength': "O Nome pode ter no máximo {{ options.maxLength }}  caracteres.",
    'name.required': "O Nome é obrigatório.",

  }
}
