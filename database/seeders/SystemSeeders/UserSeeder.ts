import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'


export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        id: 1,
        name: 'Admin',
        email: 'admin@email.com',
        password: await Hash.make('123456'),
        roleId: 1,
      },
      {
        id: 2,
        name: 'Collaborator',
        email: 'collab@email.com',
        password: await Hash.make('123456'),
        roleId: 2,
      },
    ])
  }
}
