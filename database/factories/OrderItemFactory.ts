import Factory from '@ioc:Adonis/Lucid/Factory'
import OrderItem from 'App/Models/OrderItem'
import MealFactory from './MealFactory'
import OrderFactory from './OrderFactory'

export default Factory.define(OrderItem, ({ faker }) => {
  return {
    observation: faker.lorem.word(100),
    price: parseFloat(faker.finance.amount(0.01, 999999)),
    quantity: parseFloat(faker.finance.amount(0.01, 99)),
  }
})
  .relation('order', () => OrderFactory)
  .relation('meal', () => MealFactory)
  .build()
