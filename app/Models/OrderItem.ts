import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Meal from './Meal'
import Order from './Order'

export default class OrderItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public observation: string

  @column()
  public quantity: number

  @column()
  public price: number

  @column()
  public mealId: number

  @column()
  public orderId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Meal)
  public meal: BelongsTo<typeof Meal>

  @belongsTo(() => Order)
  public order: BelongsTo<typeof Order>
}
