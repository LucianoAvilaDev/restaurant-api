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
      // ROLE: NOT USERS
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
      // ROLE: NO CLIENT
      {
        roleId: 3,
        permissionId: 3
      },
      {
        roleId: 3,
        permissionId: 1
      },
      {
        roleId: 3,
        permissionId: 4
      },
      {
        roleId: 3,
        permissionId: 5
      },
      // ROLE: NO MEALS
      {
        roleId: 4,
        permissionId: 2
      },
      {
        roleId: 4,
        permissionId: 3
      },
      {
        roleId: 4,
        permissionId: 1
      },
      {
        roleId: 4,
        permissionId: 5
      },
      // ROLE: NO ROLES
      {
        roleId: 5,
        permissionId: 2
      },
      {
        roleId: 5,
        permissionId: 3
      },
      {
        roleId: 5,
        permissionId: 4
      },
      {
        roleId: 5,
        permissionId: 1
      },
      // ROLE: NO CLIENT
      {
        roleId: 6,
        permissionId: 2
      },
      {
        roleId: 6,
        permissionId: 1
      },
      {
        roleId: 6,
        permissionId: 4
      },
      {
        roleId: 6,
        permissionId: 5
      },
      {
        roleId: 7,
        permissionId: 4
      },
      {
        roleId: 8,
        permissionId: 5
      }
    ])

  }

}
