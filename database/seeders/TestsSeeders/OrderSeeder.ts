import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Order from 'App/Models/Order'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run() {

    await Order.createMany([
      {
        id: 1,
        date: DateTime.now(),
        clientId: 1,
        tableId: 1,
        totalValue: 232.00,
        paidValue: 232.00

      },
      {
        id: 2, //TESTE EDITAR
        date: DateTime.now(),
        clientId: 2,
        tableId: 2,
        totalValue: 45.00,
        paidValue: 45.00
      },
      {
        id: 3, //TESTE DELETE
        date: DateTime.now(),
        clientId: 2,
        tableId: 2,
        totalValue: 73.00,
        paidValue: 69.00
      },
    ])
  }
}
