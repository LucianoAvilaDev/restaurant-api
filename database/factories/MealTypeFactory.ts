import MealType from 'App/Models/MealType'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(MealType, ({ faker }) => {
  return {
    name: faker.lorem.word(10),
  }
}).build()
