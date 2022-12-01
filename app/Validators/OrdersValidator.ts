import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class OrdersValidator {

  public ordersSchema: any = schema.create({

    date: schema.date(),

    clientId: schema.number(
      [
        rules.required()
      ]
    ),

    tableId: schema.number(
      [
        rules.required()
      ]
    ),

    totalValue: schema.number(
      [
        rules.range(0.01, 99999999.99),
        rules.required()
      ]
    ),

    paidValue: schema.number(
      [
        rules.range(0.01, 99999999.99),
        rules.required()
      ]
    ),

    isClosed: schema.boolean(
      [
        rules.nullable()
      ]
    ),

  })

  public ordersMessages: CustomMessages = {

    'date': "A Data é obrigatória.",

    'totalValue.range': "O Valor Total deve estar entre {{ options.start }} e {{ options.stop }}.",

    'paidValue.range': "O Valor Pago deve estar entre {{ options.start }} e {{ options.stop }}.",

    'clientId.required': "O Cliente é obrigatório.",

    'tableId.required': "A Mesa é obrigatório."


  }
}
