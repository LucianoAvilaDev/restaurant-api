import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'
import { cpf } from 'cpf-cnpj-validator'

export default class extends BaseSeeder {
  public async run() {

    await Client.createMany([
      {
        id: 1,
        name: "Cliente Teste",
        cpf: cpf.generate()
      },
      {
        id: 2,
        name: "Cliente Teste Delete",
        cpf: cpf.generate()
      },
    ])
  }
}
