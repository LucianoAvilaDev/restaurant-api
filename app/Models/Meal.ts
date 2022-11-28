import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import MealType from './MealType'
import OrderItem from './OrderItem'

export default class Meal extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column({ columnName: 'meal_type_id' })
  public mealTypeId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => MealType, {
    foreignKey: 'mealTypeId'
  })
  public mealType: HasOne<typeof MealType>

  @belongsTo(() => OrderItem)
  public orderItems: BelongsTo<typeof OrderItem>
}
