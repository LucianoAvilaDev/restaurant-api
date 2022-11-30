import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class OrderItemsValidator {

  public orderItemsSchema: any = schema.create({

    observation: schema.string(
      [
        rules.maxLength(300),
      ]
    ),

    quantity: schema.number(
      [
        rules.range(0.01, 999999.99),
      ]
    ),

    price: schema.number(
      [
        rules.range(0.01, 99999999.99),
      ]
    ),

    mealId: schema.number(
      [
        rules.required()
      ]
    ),

    orderId: schema.number(
      [
        rules.required()
      ]
    )

  })

  public orderItemsMessages: CustomMessages = {

    'observation.maxLength': "A Observação pode ter no máximo {{ options.maxLength }} caracteres.",

    'quantity.range': "A Quantidade deve estar entre {{ options.start }} e {{ options.stop }}.",

    'price.range': "O Preço deve estar entre {{ options.start }} e {{ options.stop }}.",

    'mealId.required': "A Refeição é obrigatório.",

    'orderId.required': "O Pedido é obrigatório."


  }
}
