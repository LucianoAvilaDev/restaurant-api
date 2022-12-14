import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class MealsValidator {

  public mealsSchema: any = schema.create({

    name: schema.string(
      { trim: false }, [
      rules.minLength(6),
      rules.maxLength(100),
      rules.required()
    ]),

    description: schema.string.nullableAndOptional({ trim: false }, [
      rules.maxLength(300),
    ]),

    price: schema.number(
      [
        rules.range(0.01, 99999999.99),
      ]
    ),

    mealTypeId: schema.number(
      [
        rules.unsigned()
      ]
    )

  })

  public mealsMessages: CustomMessages = {

    'name.minLength': "O Nome deve ter no mínimo {{ options.minLength }} caracteres.",
    'name.maxLength': "O Nome pode ter no máximo {{ options.maxLength }} caracteres.",
    'name.required': "O Nome é obrigatório.",

    'description.maxLength': "A Descrição pode ter no máximo {{ options.maxLength }} caracteres.",

    'price.range': "O preço deve estar entre {{ options.start }} e {{ options.stop }}.",

    'mealTypeId.required': "O Tipo de Refeição é obrigatório."

  }
}
