import Meal from 'App/Models/Meal'
import Factory from '@ioc:Adonis/Lucid/Factory'
import MealTypeFactory from './MealTypeFactory'

export default Factory.define(Meal, ({ faker }) => {
  return {
    name: faker.lorem.word(10),
    price: parseFloat(faker.finance.amount(0.01, 999999)),
    description: faker.lorem.word(100)
  }
}).relation('mealType', () => MealTypeFactory)
  .build()
