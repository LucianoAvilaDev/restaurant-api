import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        id: 1,
        name: 'SGS Admin',
        email: 'admin@email.com',
        password: '123456',
        roleId: 1,
      },
      {
        id: 2,
        name: 'SGS Collaborator',
        email: 'collab@email.com',
        password: '123456',
        roleId: 2,
      },
    ])
  }
}
