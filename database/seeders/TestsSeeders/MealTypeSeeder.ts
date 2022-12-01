import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import MealType from 'App/Models/MealType'

export default class extends BaseSeeder {
  public async run() {
    await MealType.createMany([
      {
        id: 1,
        name: 'Prato',
      },
      {
        id: 2,
        name: 'Bebida',
      },
      {
        id: 3,
        name: 'Test Update',
      },
      {
        id: 4,
        name: 'Test Delete',
      }
    ])

  }
}
