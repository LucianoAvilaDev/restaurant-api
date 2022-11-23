import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('date', { useTz: true }).defaultTo(this.now())
      table.integer('client_id').unsigned().references('clients.id')
      table.integer('table_id').unsigned().references('tables.id')
      table.decimal('total_value', 8, 2).notNullable()
      table.decimal('paid_value', 8, 2).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

