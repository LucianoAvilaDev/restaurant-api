import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Meal from 'App/Models/Meal'

export default class MealsFiltersController {
    public async handle({ response, request }: HttpContextContract) {

        const { name, type } = request.body()

        const meals: Meal[] = await Meal.query().preload('mealType')
            .if(name, (mealQuery) => {
                mealQuery.where('name', "like", `%${name}%`)
            })
            .if(type, (mealQuery) => {
                mealQuery.whereHas('mealType', (mealTypeQuery) => {
                    mealTypeQuery.where('name', 'like', `%${type}%`)
                })
            })

        return response.ok(meals)
    }
}
