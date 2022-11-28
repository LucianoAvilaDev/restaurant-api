import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersValidator {

  public static usersSchema: any = schema.create({

    name: schema.string(
      { trim: false }, [
      rules.minLength(6),
      rules.maxLength(255),
      rules.required()

    ]),

    email: schema.string(
      { trim: false }, [
      rules.email(),
      rules.required(),
      rules.unique({ table: 'users', column: 'email' })
    ]
    ),

    password: schema.string(
      { trim: false }, [
      rules.minLength(6),
      rules.maxLength(180),
      rules.required()
    ]
    ),

    roleId: schema.number(
      [
        rules.required()
      ]
    )

  })

  public static usersMessages: CustomMessages = {

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
