import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class OrdersValidator {

  public static ordersSchema: any = schema.create({

    date: schema.date(),

    totalValue: schema.number(
      [
        rules.range(0.01, 99999999.99),
      ]
    ),

    paidValue: schema.number(
      [
        rules.range(0.01, 99999999.99),
      ]
    ),

    clientId: schema.number(),

    tableId: schema.number(),

  })

  public static ordersMessages: CustomMessages = {

    'date': "A Data é obrigatória.",

    'totalValue.range': "O Valor Total deve estar entre {{ options.start }} e {{ options.stop }}.",

    'paidValue.range': "O Valor Pago deve estar entre {{ options.start }} e {{ options.stop }}.",

    'clientId.required': "O Cliente é obrigatório.",

    'tableId.required': "A Mesa é obrigatório."


  }
}
