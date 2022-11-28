import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'

export default class Table extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public number: string

  @column({ columnName: 'is_available' })
  public isAvailable: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Order, {
    foreignKey: 'tableId'
  })
  public orders: HasMany<typeof Order>
}
