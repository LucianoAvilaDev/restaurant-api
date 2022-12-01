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
        name: "SGS Collaborator",
        email: "collab.sgs@sagatech.com.br",
        password: "123456",
        roleId: 2
      },
      {
        id: 3,
        name: "Teste User Edit and Not Delete",
        email: "testeEdit.sgs@sagatech.com.br",
        password: "123456",
        roleId: 2
      },
      {
        id: 4,
        name: "Teste User Delete",
        email: "testeDelete.sgs@sagatech.com.br",
        password: "123456",
        roleId: 2
      }
    ])
  }
}
