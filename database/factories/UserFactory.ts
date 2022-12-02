import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, ({ faker }) => {
  return {
    name: faker.lorem.word(10),
    email: faker.internet.email(),
    password: faker.lorem.word(8),
    roleId: 1
  }
}).build()
