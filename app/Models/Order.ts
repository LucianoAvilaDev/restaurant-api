import { DateTime } from 'luxon'
import { BaseModel, beforeSave, BelongsTo, belongsTo, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Table from './Table'
import OrderItem from './OrderItem'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public date: DateTime

  @column()
  public totalValue: number

  @column()
  public paidValue: number

  @column()
  public clientId: number

  @column()
  public tableId: number

  @column()
  public isClosed: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Table)
  public table: BelongsTo<typeof Table>

  @hasMany(() => OrderItem)
  public orderItems: HasMany<typeof OrderItem>

}
