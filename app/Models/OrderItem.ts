import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Meal, {
    foreignKey: 'mealId'
  })
  public meal: HasOne<typeof Meal>

  @hasMany(() => Order, {
    foreignKey: 'orderTypeId'
  })
  public orders: HasMany<typeof Order>
}
