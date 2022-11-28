import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {

  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }

  public async run() {
    // await this.runSeeder(await import('../MealType'))
    // await this.runSeeder(await import('../Permission'))
    // await this.runSeeder(await import('../Role'))
    // await this.runSeeder(await import('../RolePermission'))
    await this.runSeeder(await import('../User'))

  }

}