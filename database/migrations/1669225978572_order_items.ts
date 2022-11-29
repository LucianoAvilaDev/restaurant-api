import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('observation', 'mediumtext')
      table.decimal('quantity', 6, 2).notNullable()
      table.decimal('price', 8, 2).notNullable()
      table.integer('meal_id').unsigned().references('meals.id')
      table.integer('order_id').unsigned().references('orders.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
