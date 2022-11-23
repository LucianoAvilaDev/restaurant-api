import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Meal from './Meal'

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
  public meal_id: number

  @hasOne(() => Meal, {
    foreignKey: 'meal_id'
  })
  public meal: HasOne<typeof Meal>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
