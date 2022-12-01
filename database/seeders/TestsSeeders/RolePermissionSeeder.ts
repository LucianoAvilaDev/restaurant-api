import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RolePermission from 'App/Models/RolePermission'

export default class extends BaseSeeder {

  public async run() {

    await RolePermission.createMany([
      //ROLE: ADMINISTRADOR
      {
        roleId: 1,
        permissionId: 1
      },
      {
        roleId: 1,
        permissionId: 2
      },
      {
        roleId: 1,
        permissionId: 3
      },
      {
        roleId: 1,
        permissionId: 4
      },
      {
        roleId: 1,
        permissionId: 5
      },
      // ROLE: COLABORADOR
      {
        roleId: 2,
        permissionId: 2
      },
      {
        roleId: 2,
        permissionId: 3
      },
      {
        roleId: 2,
        permissionId: 4
      },
      {
        roleId: 2,
        permissionId: 5
      },
      // ROLE: TESTE
      {
        roleId: 2,
        permissionId: 2
      },
      {
        roleId: 2,
        permissionId: 3
      },
      {
        roleId: 2,
        permissionId: 4
      },
      {
        roleId: 2,
        permissionId: 5
      },
    ])

  }

}
