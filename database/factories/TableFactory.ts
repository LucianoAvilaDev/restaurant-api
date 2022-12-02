import Table from 'App/Models/Table'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Table, ({ faker }) => {
  return {
    number: faker.lorem.word(5),
    isAvailable: true
  }
}).build()
