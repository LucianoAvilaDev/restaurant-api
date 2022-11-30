import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class ClientsValidator {

  constructor(protected clientId: number) { }

  public clientsSchema: any = schema.create({

    name: schema.string(
      { trim: false }, [
      rules.minLength(6),
      rules.maxLength(255),
      rules.required()

    ]),

    cpf: schema.string(
      [
        rules.cpfValidation(),
        rules.unique({ table: 'clients', column: 'cpf', whereNot: { id: this.clientId } })
      ]
    ),

  })

  public clientsMessages: CustomMessages = {

    'name.minLength': "O Nome deve ter no mínimo {{ options.minLength }} caracteres.",
    'name.maxLength': "O Nome pode ter no máximo {{ options.maxLength }} caracteres.",
    'name.required': "O Nome é obrigatório.",

    'rules.unique': "CPF já cadastrado.",
    'rules.cpfValidation': "CPF inválido."

  }
}
