import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import OrderItem from 'App/Models/OrderItem'

export default class extends BaseSeeder {
  public async run() {

    await OrderItem.createMany([
      {
        id: 1,
        orderId: 1,
        mealId: 1,
        quantity: 2,
        price: 44,
        observation: "Item de Pedido teste mesa 1 pedido 1 ref 1"
      },
      {
        id: 2,
        orderId: 1,
        mealId: 2,
        quantity: 1,
        price: 33,
        observation: "Item de Pedido teste mesa 1 pedido 1 ref 2"
      },
      {
        id: 3,
        orderId: 2,
        mealId: 2,
        quantity: 5,
        price: 133,
        observation: "Item de Pedido teste mesa 1 pedido 2 ref 2"
      },
    ])
  }
}
