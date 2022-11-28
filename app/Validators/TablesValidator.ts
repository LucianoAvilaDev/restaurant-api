import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class TablesValidator {

  public static tablesSchema: any = schema.create({

    number: schema.string(
      { trim: false }, [
      rules.minLength(1),
      rules.maxLength(10),
      rules.required()
    ]),

    isAvailable: schema.boolean()

  })

  public static tablesMessages: CustomMessages = {

    'name.minLength': "O Nome deve ter no mínimo {{ options.minLength }} caracteres.",
    'name.maxLength': "O Nome pode ter no máximo {{ options.maxLength }}  caracteres.",
    'name.required': "O Nome é obrigatório.",

  }
}
