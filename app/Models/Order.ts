import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Table from './Table'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public date: DateTime

  @column()
  public total_value: number

  @column()
  public paid_value: number

  @column()
  public client_id: number

  @hasOne(() => Client, {
    foreignKey: 'client_id'
  })
  public client: HasOne<typeof Client>

  @column()
  public table_id: number

  @hasOne(() => Table, {
    foreignKey: 'table_id'
  })
  public table: HasOne<typeof Table>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
