import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {

    await User.createMany([
      {
        id: 1,
        name: "Luciano",
        email: "luciano.diniz@sagatechbrasil.com.br",
        password: "123456",
        roleId: 1
      }
    ])
  }
}
