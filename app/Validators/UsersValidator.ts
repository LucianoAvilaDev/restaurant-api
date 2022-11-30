import { schema, CustomMessages, rules, SchemaRef } from '@ioc:Adonis/Core/Validator'

export default class UsersValidator {

  constructor(protected userId: number) { }

  public usersSchema: any = schema.create({

    name: schema.string(
      { trim: false }, [
      rules.minLength(6),
      rules.maxLength(200),
      rules.required()
    ]),

    email: schema.string(
      { trim: false }, [
      rules.required(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.userId } })
    ]
    ),

    password: schema.string(
      { trim: false }, [
      rules.minLength(6),
      rules.maxLength(100),
      rules.required()
    ]
    ),

    roleId: schema.number([
      rules.required()
    ])

  })

  public usersMessages: CustomMessages = {

    'name.minLength': "O Nome deve ter no mínimo {{ options.minLength }} caracteres",
    'name.maxLength': "O Nome pode ter no máximo {{ options.maxLength }} caracteres",
    'name.required': "O Nome é obrigatório!",

    'email.email': "E-mail inválido",
    'email.unique': "E-mail já cadastrado",
    'email.required': "O E-mail é obrigatório!",

    'password.minLength': "A Senha deve ter no mínimo {{ options.minLength }} caracteres",
    'password.maxLength': "A Senha pode ter no máximo {{ options.maxLength }} caracteres",
    'password.required': "A Senha é obrigatória!",

    'roleId.required': "O Perfil é obrigatório!"

  }
}
