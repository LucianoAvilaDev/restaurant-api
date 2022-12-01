import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class TablesValidator {

  public tablesSchema: any = schema.create({

    number: schema.string(
      { trim: false }, [
      rules.minLength(1),
      rules.maxLength(10),
      rules.required()
    ]),

    isAvailable: schema.boolean([
      rules.required()
    ])

  })

  public tablesMessages: CustomMessages = {

    'name.minLength': "O Nome deve ter no mínimo {{ options.minLength }} caracteres.",
    'name.maxLength': "O Nome pode ter no máximo {{ options.maxLength }}  caracteres.",
    'name.required': "O Nome é obrigatório.",

    'isAvailable.required': "A Disponibilidade é obrigatória.",

  }
}
