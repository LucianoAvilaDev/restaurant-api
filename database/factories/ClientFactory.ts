import Client from 'App/Models/Client'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { cpf } from 'cpf-cnpj-validator'

export default Factory.define(Client, ({ faker }) => {
  return {
    name: faker.internet.userName(),
    cpf: cpf.generate()
  }
}).build()
