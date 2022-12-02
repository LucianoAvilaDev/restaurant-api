import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run() {
    await Role.createMany([
      {
        id: 1,
        name: 'Administrador',
      },
      {
        id: 2,
        name: `Can't Handle Users`,
      },
      {
        id: 3,
        name: `Can't Handle Clients`,
      },
      {
        id: 4,
        name: `Can't Handle Meals`,
      },
      {
        id: 5,
        name: `Can't Handle Roles`,
      },
      {
        id: 6,
        name: `Can't Handle Orders`,
      },
      {
        id: 7,
        name: `Test edit`,
      },
      {
        id: 8,
        name: `Test delete`,
      }
    ])
  }
}
