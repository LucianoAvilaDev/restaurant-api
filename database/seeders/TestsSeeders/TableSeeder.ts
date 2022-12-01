import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Table from 'App/Models/Table'

export default class extends BaseSeeder {
  public async run() {

    await Table.createMany([
      {
        id: 1,
        number: "001",
        isAvailable: true
      },
      {
        id: 2,
        number: "002",
        isAvailable: true
      },
      {
        id: 3,
        number: "Edit",
        isAvailable: false
      },
      {
        id: 4,
        number: "Delete",
        isAvailable: false
      }
    ])
  }
}
