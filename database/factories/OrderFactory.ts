import Order from 'App/Models/Order'
import Factory from '@ioc:Adonis/Lucid/Factory'
import ClientsFactory from './ClientFactory'
import TableFactory from './TableFactory'
import { DateTime } from 'luxon'

export default Factory.define(Order, ({ faker }) => {
  return {
    date: DateTime.now(),
    paidValue: parseFloat(faker.finance.amount(0.01, 9999)),
    totalValue: parseFloat(faker.finance.amount(0.01, 9999)),
    isClosed: false
  }
}).relation('client', () => ClientsFactory)
  .relation('table', () => TableFactory)
  .build()
