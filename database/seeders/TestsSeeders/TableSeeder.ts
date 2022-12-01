import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Table from 'App/Models/Table'

export default class extends BaseSeeder {
  public async run() {

    await Table.createMany([
      {
        id: 1,
        number: "Mesa teste 001",
        isAvailable: true
      },
      {
        id: 2,
        number: "Mesa teste 002",
        isAvailable: true
      },
      {
        id: 3,
        number: "Mesa teste delete 003",
        isAvailable: false
      },
    ])
  }
}
