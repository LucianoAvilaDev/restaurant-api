import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Table from 'App/Models/Table'

export default class TablesFiltersController {
  public async handle({ response, request }: HttpContextContract) {

    const { number, isAvailable } = request.body()



    const Tables: Table[] = await Table.query()
      .if(number, (TableQuery) => {
        TableQuery.where('number', "like", `%${number}%`)
      })
      .if(isAvailable && isAvailable == 'true', (TableQuery) => {
        TableQuery.where('isAvailable', true)
      })
      .if(isAvailable && isAvailable == 'false', (TableQuery) => {
        TableQuery.where('isAvailable', false)
      })

    return response.ok(Tables)
  }
}
