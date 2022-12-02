import Permission from 'App/Models/Permission'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Permission, ({ faker }) => {
  return {
    name: faker.lorem.word(10),
    description: faker.lorem.words(3),
  }
}).build()
