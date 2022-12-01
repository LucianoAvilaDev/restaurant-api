import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Meal from 'App/Models/Meal'

export default class extends BaseSeeder {
  public async run() {

    await Meal.createMany([
      {
        id: 1,
        name: "Prato Teste",
        description: "",
        price: 13.50,
        mealTypeId: 1
      },
      {
        id: 2,
        name: "Bebida Teste",
        description: "",
        price: 4.50,
        mealTypeId: 2
      },
      {
        id: 3,
        name: "Refeição Teste Delete",
        price: 23.50,
        description: "",
        mealTypeId: 2
      },
    ])
  }
}
