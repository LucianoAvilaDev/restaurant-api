import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {

  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../SystemSeeders/PermissionSeeder'))
    await this.runSeeder(await import('../SystemSeeders/RoleSeeder'))
    await this.runSeeder(await import('../SystemSeeders/RolePermissionSeeder'))
    await this.runSeeder(await import('../SystemSeeders/UserSeeder'))
    await this.runSeeder(await import('../SystemSeeders/MealTypeSeeder'))
  }

  // // ***************************** FOR TESTS **********************************

  // public async run() {
  //   await this.runSeeder(await import('../TestsSeeders/PermissionSeeder'))
  //   await this.runSeeder(await import('../TestsSeeders/RoleSeeder'))
  //   await this.runSeeder(await import('../TestsSeeders/RolePermissionSeeder'))
  //   await this.runSeeder(await import('../TestsSeeders/UserSeeder'))
  //   await this.runSeeder(await import('../TestsSeeders/ClientSeeder'))
  //   await this.runSeeder(await import('../TestsSeeders/TableSeeder'))
  //   await this.runSeeder(await import('../TestsSeeders/MealTypeSeeder'))
  //   await this.runSeeder(await import('../TestsSeeders/MealSeeder'))
  //   await this.runSeeder(await import('../TestsSeeders/OrderSeeder'))
  //   await this.runSeeder(await import('../TestsSeeders/OrderItemSeeder'))

  // }

  // // **************************************************************************


}
