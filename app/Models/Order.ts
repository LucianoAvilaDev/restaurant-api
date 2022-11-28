import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Table from './Table'
import OrderItem from './OrderItem'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public date: DateTime

  @column({ columnName: 'total_value' })
  public totalValue: number

  @column({ columnName: 'paid_value' })
  public paidValue: number

  @column({ columnName: 'client_id' })
  public clientId: number

  @column({ columnName: 'table_id' })
  public tableId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Client, {
    foreignKey: 'clientId'
  })
  public client: HasOne<typeof Client>

  @hasOne(() => Table, {
    foreignKey: 'tableId'
  })
  public table: HasOne<typeof Table>

  @belongsTo(() => OrderItem)
  public orderItems: BelongsTo<typeof OrderItem>

}
