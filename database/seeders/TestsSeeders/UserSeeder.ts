import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {

    await User.createMany([
      {
        id: 1,
        name: "SGS Admin",
        email: "admin.sgs@sagatech.com.br",
        password: "123456",
        roleId: 1
      },
      {
        id: 2,
        name: "Not User",
        email: "notuser@email.com",
        password: "123456",
        roleId: 2
      },
      {
        id: 3,
        name: "Not Client",
        email: "notclient@email.com",
        password: "123456",
        roleId: 3
      },
      {
        id: 4,
        name: "Not Meal",
        email: "notmeal@email.com",
        password: "123456",
        roleId: 4
      },
      {
        id: 5,
        name: "Not Role",
        email: "notrole@email.com",
        password: "123456",
        roleId: 5
      },
      {
        id: 6,
        name: "Not Order",
        email: "notorder@email.com",
        password: "123456",
        roleId: 6
      }
    ])
  }
}
