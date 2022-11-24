import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RolePermission from 'App/Models/RolePermission'

export default class extends BaseSeeder {

  public async run() {

    await RolePermission.createMany([
      //ROLE: ADMINISTRADOR
      {
        role_id: 1,
        permission_id: 1
      },
      {
        role_id: 1,
        permission_id: 2
      },
      {
        role_id: 1,
        permission_id: 3
      },
      {
        role_id: 1,
        permission_id: 4
      },
      {
        role_id: 1,
        permission_id: 5
      },
      // ROLE: COLABORADOR
      {
        role_id: 2,
        permission_id: 2
      },
      {
        role_id: 2,
        permission_id: 3
      },
      {
        role_id: 2,
        permission_id: 4
      },
      {
        role_id: 2,
        permission_id: 5
      },
    ])

  }

}
