import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Table from './Table'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public date: DateTime

  @column({ isPrimary: true })
  public total_value: number

  @column({ isPrimary: true })
  public paid_value: number

  @hasOne(() => Client, {
    foreignKey: 'client_id'
  })
  public client: HasOne<typeof Client>

  @hasOne(() => Table, {
    foreignKey: 'table_id'
  })
  public table: HasOne<typeof Table>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
