import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Meal from 'App/Models/Meal'

export default class extends BaseSeeder {
  public async run() {

    await Meal.createMany([
      {
        id: 1,
        name: "Prato Teste",
        mealTypeId: 1
      },
      {
        id: 2,
        name: "Bebida Teste",
        mealTypeId: 2
      },
      {
        id: 3,
        name: "Refeição Teste Delete",
        mealTypeId: 2
      },
    ])
  }
}
